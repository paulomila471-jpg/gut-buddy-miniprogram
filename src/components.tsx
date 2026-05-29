import { Text, View } from '@tarojs/components';

export function PoopIcon({ label, variant = 'golden', locked = false }: { label?: string; variant?: string; locked?: boolean }) {
  return (
    <View className={`stool-icon ${variant} ${locked ? 'locked' : ''}`} aria-label={label || '卡通便便图标'}>
      <View className="poop-shape">
        <View className="poop-eye left" />
        <View className="poop-eye right" />
        <View className="poop-mouth" />
        <View className="poop-mark one" />
        <View className="poop-mark two" />
        <View className="poop-mark three" />
      </View>
    </View>
  );
}

export function MedicalNotice() {
  return (
    <View className="warning-card">
      <Text className="section-title">需要优先关注身体状态</Text>
      <Text className="body-text">
        你描述或选择的情况可能需要医疗专业人员及时评估。本工具无法判断具体原因，也不适合只依靠自我调整处理。建议尽快联系医生；如症状严重或迅速加重，请及时寻求紧急医疗帮助。
      </Text>
    </View>
  );
}
