<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

type WeatherResult = {
  city: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
};

const weather = ref<WeatherResult | null>(null);
const loading = ref(true);
const errorMessage = ref('');

const weatherCodeMap: Record<number, string> = {
  0: '晴朗',
  1: '大部晴朗',
  2: '局部多云',
  3: '阴天',
  45: '有雾',
  48: '雾凇',
  51: '小毛毛雨',
  53: '毛毛雨',
  55: '强毛毛雨',
  56: '冻毛毛雨',
  57: '强冻毛毛雨',
  61: '小雨',
  63: '中雨',
  65: '大雨',
  66: '冻雨',
  67: '强冻雨',
  71: '小雪',
  73: '中雪',
  75: '大雪',
  77: '冰粒',
  80: '阵雨',
  81: '较强阵雨',
  82: '强阵雨',
  85: '阵雪',
  86: '强阵雪',
  95: '雷暴',
  96: '雷暴伴小冰雹',
  99: '雷暴伴大冰雹',
};

const weatherText = computed(() => {
  if (!weather.value) {
    return '';
  }

  return weatherCodeMap[weather.value.weatherCode] ?? '天气状态未知';
});

const getCurrentPosition = () =>
  new Promise<GeolocationPosition>((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('当前浏览器不支持定位'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 12000,
      maximumAge: 5 * 60 * 1000,
    });
  });

const fetchLocalWeather = async () => {
  try {
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;
    const fallbackCity = `纬度 ${latitude.toFixed(2)}，经度 ${longitude.toFixed(2)}`;

    const [locationResponse, weatherResponse] = await Promise.all([
      fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=zh`
      ),
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
      ),
    ]);

    if (!weatherResponse.ok) {
      throw new Error('天气服务暂时不可用');
    }

    const locationData = locationResponse.ok ? await locationResponse.json() : null;
    const weatherData = await weatherResponse.json();
    const current = weatherData?.current;
    const currentCity =
      locationData?.city || locationData?.locality || locationData?.principalSubdivision || fallbackCity;

    if (!current) {
      throw new Error('未获取到天气数据');
    }

    weather.value = {
      city: currentCity,
      temperature: current.temperature_2m,
      apparentTemperature: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      weatherCode: current.weather_code,
    };

    window.dispatchEvent(
      new CustomEvent('weather:change', {
        detail: { weatherCode: current.weather_code },
      })
    );
  } catch (error) {
    if (error instanceof GeolocationPositionError) {
      if (error.code === error.PERMISSION_DENIED) {
        errorMessage.value = '定位权限被拒绝，请允许访问位置信息';
      } else if (error.code === error.TIMEOUT) {
        errorMessage.value = '定位超时，请稍后重试';
      } else {
        errorMessage.value = '定位失败，请检查网络和系统定位设置';
      }
    } else if (error instanceof Error) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = '获取天气失败，请稍后重试';
    }
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchLocalWeather();
});
</script>

<template>
  <div class="mt-4 rounded-md border border-line bg-(--color-content-bg) p-4">
    <h3 class="text-lg font-semibold">本地天气</h3>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">根据你当前定位展示实时天气</p>

    <p
      v-if="loading"
      class="mt-4 text-sm text-gray-500 dark:text-gray-300"
    >
      正在获取定位与天气...
    </p>

    <p
      v-else-if="errorMessage"
      class="mt-4 text-sm text-red-500"
    >
      {{ errorMessage }}
    </p>

    <div
      v-else-if="weather"
      class="mt-4 grid grid-cols-2 gap-2 text-sm"
    >
      <div class="col-span-2 text-base font-medium">
        {{ weather.city }} · {{ weatherText }}
      </div>
      <div>温度：{{ weather.temperature }}°C</div>
      <div>体感：{{ weather.apparentTemperature }}°C</div>
      <div>湿度：{{ weather.humidity }}%</div>
      <div>风速：{{ weather.windSpeed }} km/h</div>
    </div>
  </div>
</template>
