import Taro from '@tarojs/taro';
import { Button, Text, View } from '@tarojs/components';
import { PoopIcon } from '../../components';
import './index.scss';

const entries = [
  { label: '今日便便打卡', url: '/pages/checkin/index', primary: true },
  { label: '问问 Gut Buddy', url: '/pages/buddy/index' },
  { label: '便便厨房', url: '/pages/kitchen/index' },
  { label: '便便图鉴', url: '/pages/atlas/index' },
  { label: '最近记录', url: '/pages/records/index' },
];

export default function IndexPage() {
  return (
    <View className="page stack home-page">
      <View className="brand-card">
        <PoopIcon />
        <View className="brand-copy">
          <Text className="kicker">Daily habit buddy</Text>
          <Text className="hero-title">Gut Buddy 便便实验室</Text>
          <Text className="body-text">
            面向日常使用的排便习惯记录与生活方式陪伴工具，用卡通方式记录今天的身体节奏。
          </Text>
        </View>
      </View>

      <View className="button-grid">
        {entries.map((entry) => (
          <Button
            key={entry.url}
            className={entry.primary ? 'primary-button' : 'secondary-button'}
            onClick={() => Taro.navigateTo({ url: entry.url })}
          >
            {entry.label}
          </Button>
        ))}
      </View>

      <View className="card stack">
        <Text className="section-title">非医疗声明</Text>
        <Text className="body-text">
          本产品用于生活习惯记录与健康知识科普，不提供疾病诊断、治疗方案、药物或保健品建议。
        </Text>
        <Button className="ghost-button" onClick={() => Taro.navigateTo({ url: '/pages/disclaimer/index' })}>
          查看免责声明
        </Button>
        <Button className="ghost-button" onClick={() => Taro.navigateTo({ url: '/pages/privacy/index' })}>
          查看隐私说明
        </Button>
      </View>
    </View>
  );
}
