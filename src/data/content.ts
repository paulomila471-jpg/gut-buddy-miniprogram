export type StoolTone = 'hard' | 'formed' | 'soft' | 'watery';

export type StoolType = {
  id: number;
  name: string;
  description: string;
  tone: StoolTone;
  variant: string;
};

export type KitchenIngredient = {
  name: string;
  group: string;
  fiber: number;
  water: number;
  oily: number;
  gas: number;
  tags: string[];
};

export type Role = {
  name: string;
  hidden: boolean;
  variant: string;
  trigger: string;
  explanation: string;
};

export const stoolTypes: StoolType[] = [
  { id: 1, name: '石子连珠便', description: '一颗颗硬球，偏硬，可能较难排出', tone: 'hard', variant: 'pebbles' },
  { id: 2, name: '粗糙香肠便', description: '成条但凹凸硬实，仍然偏硬', tone: 'hard', variant: 'bumpy' },
  { id: 3, name: '裂纹香蕉便', description: '成形但表面有裂纹，稍偏干', tone: 'formed', variant: 'cracked' },
  { id: 4, name: '黄金香蕉便', description: '光滑、柔软、成形，部分人会觉得比较容易排出', tone: 'formed', variant: 'golden' },
  { id: 5, name: '软团便', description: '柔软小团块，偏软', tone: 'soft', variant: 'soft' },
  { id: 6, name: '泥浆便', description: '松散、糊状，比较稀软', tone: 'soft', variant: 'muddy' },
  { id: 7, name: '水样便', description: '液体状，需要注意频率和身体感受', tone: 'watery', variant: 'watery' },
];

export const roles: Role[] = [
  { name: '石子连珠怪', hidden: false, variant: 'pebbles', trigger: '水分和纤维都偏少的组合', explanation: '游戏里代表偏硬方向，用来提醒继续观察饮水、蔬果和活动节奏。' },
  { name: '粗糙硬肠怪', hidden: false, variant: 'bumpy', trigger: '主食偏精细、饮水偏少的组合', explanation: '游戏里代表仍然偏硬的方向，不代表现实中一定如此。' },
  { name: '裂纹香蕉便', hidden: false, variant: 'cracked', trigger: '稍有纤维但水分不算充足的组合', explanation: '游戏里代表成形但略偏干的方向。' },
  { name: '黄金香蕉便之王', hidden: false, variant: 'golden', trigger: '全谷物或薯类、蔬果、白水和活动组合', explanation: '游戏里代表相对均衡、顺畅的生活方式方向。' },
  { name: '软团团便', hidden: false, variant: 'soft', trigger: '水分或软质食物偏多的组合', explanation: '游戏里代表偏软方向，可以继续观察当天感受。' },
  { name: '泥浆便便怪', hidden: false, variant: 'muddy', trigger: '油辣刺激或甜饮偏多的组合', explanation: '游戏里代表稀软方向，持续异常时应关注身体状态。' },
  { name: '水样便警报员', hidden: false, variant: 'watery', trigger: '水样方向或警示组合', explanation: '游戏里也会提醒注意频率、身体感受和警示表现。' },
  { name: '火锅烈焰泥浆便', hidden: true, variant: 'flame', trigger: '火锅、辣食、烧烤等刺激组合', explanation: '娱乐角色，用来提示油辣刺激可能值得继续观察。' },
  { name: '奶茶黏黏便', hidden: true, variant: 'milktea', trigger: '奶茶、甜饮和精细主食组合', explanation: '娱乐角色，用来提示甜饮摄入和排便体验之间可能存在关联。' },
  { name: '气泡屁屁便', hidden: true, variant: 'bubble', trigger: '碳酸饮料或豆类组合', explanation: '娱乐角色，用来提示胀气感受可以和饮食一起记录。' },
  { name: '熬夜打工便', hidden: true, variant: 'worker', trigger: '熬夜或压力很大组合', explanation: '娱乐角色，用来提示作息压力可能影响部分人的身体节奏。' },
  { name: '外卖之王便', hidden: true, variant: 'takeout', trigger: '方便面、炸鸡、薯条、重油外卖等组合', explanation: '娱乐角色，用来提示外卖频率可以作为生活方式观察项。' },
  { name: '绿色森林便', hidden: true, variant: 'forest', trigger: '绿叶蔬菜、西兰花、苹果、梨等蔬果组合', explanation: '娱乐角色，用来鼓励记录蔬果与排便体验之间可能的关系。' },
  { name: '火龙果彩蛋便', hidden: true, variant: 'dragonfruit', trigger: '选择火龙果', explanation: '彩蛋角色，只做趣味提示，不代表现实中一定产生对应变化。' },
  { name: '健身达人便', hidden: true, variant: 'fitness', trigger: '白水、全谷物或蔬果，并选择散步或运动', explanation: '娱乐角色，用来提示活动和饮水可以一起观察。' },
  { name: '沙发宅宅便', hidden: true, variant: 'sofa', trigger: '久坐、饮水少、纤维少的组合', explanation: '娱乐角色，用来提示久坐和饮水变化可以继续观察。' },
  { name: '早餐活力便', hidden: true, variant: 'breakfast', trigger: '燕麦、香蕉、酸奶等早餐组合', explanation: '娱乐角色，用来提示规律早餐也可以作为习惯记录项。' },
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

export const kitchenGroups = [
  { title: '主食与全谷物/薯类', names: ['白米饭', '面条', '白面包', '方便面', '燕麦', '玉米', '红薯', '杂粮饭'] },
  { title: '蔬果', names: ['绿叶蔬菜', '西兰花', '胡萝卜', '苹果', '香蕉', '火龙果', '梨'] },
  { title: '高油或刺激类', names: ['炸鸡', '薯条', '火锅', '烧烤', '辣食', '重油外卖'] },
  { title: '饮品与其他', names: ['白水', '奶茶', '甜饮', '咖啡', '碳酸饮料', '酸奶', '豆类'] },
];

export const kitchenIngredients: KitchenIngredient[] = [
  { name: '白米饭', group: '主食与全谷物/薯类', fiber: 0, water: 0, oily: 0, gas: 0, tags: ['refined'] },
  { name: '面条', group: '主食与全谷物/薯类', fiber: 0, water: 0, oily: 0, gas: 0, tags: ['refined'] },
  { name: '白面包', group: '主食与全谷物/薯类', fiber: 0, water: -1, oily: 0, gas: 0, tags: ['refined'] },
  { name: '方便面', group: '主食与全谷物/薯类', fiber: 0, water: -1, oily: 2, gas: 0, tags: ['takeout'] },
  { name: '燕麦', group: '主食与全谷物/薯类', fiber: 3, water: 1, oily: 0, gas: 1, tags: ['wholegrain', 'breakfast'] },
  { name: '玉米', group: '主食与全谷物/薯类', fiber: 2, water: 1, oily: 0, gas: 1, tags: ['wholegrain'] },
  { name: '红薯', group: '主食与全谷物/薯类', fiber: 3, water: 1, oily: 0, gas: 1, tags: ['wholegrain'] },
  { name: '杂粮饭', group: '主食与全谷物/薯类', fiber: 3, water: 1, oily: 0, gas: 1, tags: ['wholegrain'] },
  { name: '绿叶蔬菜', group: '蔬果', fiber: 3, water: 2, oily: 0, gas: 0, tags: ['forest'] },
  { name: '西兰花', group: '蔬果', fiber: 3, water: 1, oily: 0, gas: 2, tags: ['forest'] },
  { name: '胡萝卜', group: '蔬果', fiber: 2, water: 1, oily: 0, gas: 0, tags: ['forest'] },
  { name: '苹果', group: '蔬果', fiber: 2, water: 2, oily: 0, gas: 0, tags: ['forest'] },
  { name: '香蕉', group: '蔬果', fiber: 1, water: 1, oily: 0, gas: 0, tags: ['breakfast'] },
  { name: '火龙果', group: '蔬果', fiber: 2, water: 2, oily: 0, gas: 0, tags: ['dragonfruit'] },
  { name: '梨', group: '蔬果', fiber: 2, water: 3, oily: 0, gas: 0, tags: ['forest'] },
  { name: '炸鸡', group: '高油或刺激类', fiber: 0, water: -1, oily: 3, gas: 0, tags: ['takeout'] },
  { name: '薯条', group: '高油或刺激类', fiber: 0, water: -1, oily: 3, gas: 0, tags: ['takeout'] },
  { name: '火锅', group: '高油或刺激类', fiber: 0, water: 0, oily: 3, gas: 1, tags: ['hotpot', 'spicy'] },
  { name: '烧烤', group: '高油或刺激类', fiber: 0, water: -1, oily: 3, gas: 0, tags: ['takeout', 'spicy'] },
  { name: '辣食', group: '高油或刺激类', fiber: 0, water: 0, oily: 2, gas: 0, tags: ['spicy'] },
  { name: '重油外卖', group: '高油或刺激类', fiber: 0, water: -1, oily: 3, gas: 0, tags: ['takeout'] },
  { name: '白水', group: '饮品与其他', fiber: 0, water: 4, oily: 0, gas: 0, tags: ['water'] },
  { name: '奶茶', group: '饮品与其他', fiber: 0, water: 1, oily: 1, gas: 0, tags: ['milktea', 'sweet'] },
  { name: '甜饮', group: '饮品与其他', fiber: 0, water: 1, oily: 0, gas: 0, tags: ['sweet'] },
  { name: '咖啡', group: '饮品与其他', fiber: 0, water: 1, oily: 0, gas: 0, tags: ['coffee'] },
  { name: '碳酸饮料', group: '饮品与其他', fiber: 0, water: 1, oily: 0, gas: 4, tags: ['bubble', 'sweet'] },
  { name: '酸奶', group: '饮品与其他', fiber: 0, water: 1, oily: 0, gas: 1, tags: ['breakfast'] },
  { name: '豆类', group: '饮品与其他', fiber: 3, water: 1, oily: 0, gas: 4, tags: ['bubble'] },
];

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

export const ATLAS_STORAGE_KEY = 'gut-buddy-atlas-unlocked';
