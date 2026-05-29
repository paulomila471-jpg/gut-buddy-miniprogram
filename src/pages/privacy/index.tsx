import { Text, View } from '@tarojs/components';

export default function PrivacyPage() {
  return (
    <View className="page stack">
      <View className="card stack">
        <Text className="kicker">Privacy</Text>
        <Text className="section-title">隐私说明</Text>
        <Text className="body-text">
          第一阶段仅制作页面骨架与模拟交互，不接微信正式登录，不建立真实健康数据库，不上传真实用户健康数据。
        </Text>
      </View>
      <View className="card stack">
        <Text className="section-title">未来正式版需要说明</Text>
        <Text className="body-text">
          若后续接入微信登录、打卡数据、AI 对话或订阅提醒，需要在隐私政策中说明数据用途、保存期限、删除方式和第三方服务调用边界。
        </Text>
      </View>
      <View className="card stack">
        <Text className="section-title">禁止内容</Text>
        <Text className="body-text">
          当前阶段不接入 DeepSeek API，不写入 API Key，不做餐食照片、AI 识图、付费订阅、社区或医疗服务。
        </Text>
      </View>
    </View>
  );
}
