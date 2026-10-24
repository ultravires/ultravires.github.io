export interface Moment {
  /** 发布时间，格式 'YYYY-MM-DD HH:mm' */
  date: string;
  /** 内容，支持 Markdown */
  content: string;
  /** 可选标签 */
  tags?: string[];
}

// 新的时刻追加在数组顶部
const moments: Moment[] = [
  {
    date: '2026-10-24 11:09',
    content: '公司举办 1024 AI 黑客马拉松比赛，今天周六来加班，感觉比工作日轻松很多，还可以调休。',
    tags: ['日常']
  },
  {
    date: '2026-09-24 21:30',
    content: '开通了「时刻」页面，以后转瞬即逝的想法和日常碎片就记录在这里。',
    tags: ['日常']
  }
];

export default moments;
