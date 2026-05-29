import { Text, View } from '@tarojs/components';
import { MedicalNotice } from '../../components';

export default function DisclaimerPage() {
  return (
    <View className="page stack">
      <View className="card stack">
        <Text className="kicker">Disclaimer</Text>
        <Text className="section-title">免责声明</Text>
        <Text className="body-text">
          Gut Buddy 便便实验室用于排便习惯记录与生活方式科普，不是 AI 医生、注册营养师、治疗工具或医疗服务。
        </Text>
      </View>
      <View className="card stack">
        <Text className="section-title">产品边界</Text>
        <Text className="body-text">
          本产品不诊断疾病，不提供治疗方案，不推荐药物、保健品或排毒产品，也不允许上传真实排泄物照片。
        </Text>
      </View>
      <MedicalNotice />
    </View>
  );
}
