import { Text, View } from '@tarojs/components';
import { PoopIcon } from '../../components';
import { mockRecords } from '../../data/content';
import './index.scss';

export default function RecordsPage() {
  return (
    <View className="page stack records-page">
      <View className="card stack">
        <Text className="kicker">Local mock data</Text>
        <Text className="section-title">最近 7 天记录样式</Text>
        <Text className="body-text">第一阶段仅使用模拟数据展示样式，不保存真实用户健康数据到云端。</Text>
      </View>

      <View className="card stack">
        <Text className="section-title">谨慎趋势观察</Text>
        <Text className="body-text">
          模拟记录中偏硬便便的日子，也出现过喝水少标签。你可以继续观察饮水和活动变化是否与排便体验有关。此处不做因果判断或疾病判断。
        </Text>
      </View>

      {mockRecords.map((record) => (
        <View className="record-card" key={record.date}>
          <PoopIcon label={record.type} />
          <View className="record-copy">
            <Text className="kicker">{record.date}</Text>
            <Text className="section-title">{record.type}</Text>
            <Text className="body-text">排便感受：{record.feeling}</Text>
            <View className="tag-cloud">
              {record.tags.map((tag) => <Text className="tag readonly" key={tag}>{tag}</Text>)}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}
