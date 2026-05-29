export type StoolType = {
  id: number;
  name: string;
  description: string;
  tone: 'hard' | 'formed' | 'soft' | 'watery';
};

export const stoolTypes: StoolType[] = [
  { id: 1, name: '石子连珠便', description: '一颗颗硬球，偏硬，可能较难排出', tone: 'hard' },
  { id: 2, name: '粗糙香肠便', description: '成条但凹凸硬实，仍然偏硬', tone: 'hard' },
  { id: 3, name: '裂纹香蕉便', description: '成形但表面有裂纹，稍偏干', tone: 'formed' },
  { id: 4, name: '黄金香蕉便', description: '光滑、柔软、成形，部分人会觉得比较容易排出', tone: 'formed' },
  { id: 5, name: '软团便', description: '柔软小团块，偏软', tone: 'soft' },
  { id: 6, name: '泥浆便', description: '松散、糊状，比较稀软', tone: 'soft' },
  { id: 7, name: '水样便', description: '液体状，需要注意频率和身体感受', tone: 'watery' },
];

export const feelings = ['很顺畅', '有一点费力', '很费力', '很急，差点忍不住', '拉完仍不舒服', '今天拉了很多次'];

export const dietTags = ['白水', '燕麦', '红薯', '杂粮饭', '绿叶蔬菜', '苹果', '香蕉', '火锅', '炸鸡', '奶茶', '甜饮', '咖啡'];

export const waterOptions = ['几乎没喝水', '正常喝水', '喝水比较充足'];

export const activityOptions = ['久坐了一整天', '普通活动', '散步或运动了'];

export const statusOptions = ['熬夜', '压力很大', '作息正常', '比较放松'];

export const warningOptions = [
  '明显鲜红色血便',
  '黑色柏油样便',
  '明显或剧烈腹痛',
  '发热或呕吐',
  '无法排气或明显腹胀',
  '明显脱水或虚弱',
  '连续多天排便异常',
  '以上都没有',
];

export const kitchenIngredients = ['白水', '燕麦', '红薯', '绿叶蔬菜', '香蕉', '酸奶', '火锅', '炸鸡', '奶茶', '豆类'];

export const mockRecords = [
  { date: '今天', type: '4型 黄金香蕉便', feeling: '很顺畅', tags: ['正常喝水', '散步或运动了', '作息正常'] },
  { date: '昨天', type: '3型 裂纹香蕉便', feeling: '有一点费力', tags: ['几乎没喝水', '普通活动'] },
  { date: '周二', type: '5型 软团便', feeling: '拉完仍不舒服', tags: ['奶茶', '熬夜'] },
  { date: '周一', type: '4型 黄金香蕉便', feeling: '很顺畅', tags: ['白水', '绿叶蔬菜'] },
];

export function lifestyleReference(stoolId: number, hasWarning: boolean) {
  if (hasWarning) {
    return '你选择了需要关注的警示表现。本工具无法判断具体原因，建议及时咨询医疗专业人员；如症状明显或迅速加重，请及时寻求紧急医疗帮助。';
  }
  if ([1, 2].includes(stoolId)) {
    return '今天的形态可能偏硬。部分人可以尝试规律饮水、增加蔬果或全谷物，并继续观察活动变化与排便体验之间可能的关系。';
  }
  if ([5, 6, 7].includes(stoolId)) {
    return '今天的形态可能偏软或水样。可以继续观察是否偶尔发生，回想油辣甜饮或作息变化；持续异常时建议咨询医疗专业人员。';
  }
  return '今天的形态相对成形。可以继续观察饮食多样、适量饮水、轻度活动和规律作息是否有助于保持舒服节奏。';
}
