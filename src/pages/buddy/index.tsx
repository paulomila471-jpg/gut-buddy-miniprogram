import { useState } from 'react';
import { Button, Input, Text, View } from '@tarojs/components';
import { MedicalNotice } from '../../components';
import './index.scss';

type Message = {
  role: 'assistant' | 'user';
  text: string;
  warning?: boolean;
};

const welcome: Message = {
  role: 'assistant',
  text: '你好，我是 Gut Buddy。第一阶段我使用模拟回复，可以陪你练习记录排便、饮食、饮水、活动和作息习惯。如果你提到警示表现，我会优先提示关注身体状态。',
};

const warningWords = ['便血', '黑便', '腹痛', '呕吐', '发热', '无法排气', '脱水'];

export default function BuddyPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([welcome]);

  const send = () => {
    const content = input.trim();
    if (!content) return;
    const warning = warningWords.some((word) => content.includes(word));
    const reply = warning
      ? '你提到了可能需要优先关注的表现。本工具无法判断具体原因，建议及时咨询医疗专业人员；如症状严重或迅速加重，请及时寻求紧急医疗帮助。'
      : '这是第一阶段模拟回复：你可以继续观察饮食、饮水、活动和作息变化是否与排便体验有关。普通生活方式参考可以从规律饮水、轻度活动和舒服如厕习惯开始。';
    setMessages((current) => [...current, { role: 'user', text: content }, { role: 'assistant', text: reply, warning }]);
    setInput('');
  };

  return (
    <View className="page stack buddy-page">
      <View className="card stack">
        <Text className="kicker">Gut Buddy</Text>
        <Text className="section-title">私人排便习惯小助手</Text>
        <Text className="body-text">
          本助手仅提供一般生活方式与习惯记录信息，不提供医学诊断、治疗或药物建议。如出现严重或持续异常，请及时咨询医疗专业人员。
        </Text>
      </View>

      <View className="chat-list">
        {messages.map((message, index) => (
          <View key={`${message.role}-${index}`} className={`bubble ${message.role}`}>
            {message.warning && <MedicalNotice />}
            <Text>{message.text}</Text>
          </View>
        ))}
      </View>

      <View className="input-card">
        <Input
          className="chat-input"
          value={input}
          placeholder="描述今天的排便、饮食或身体感受"
          maxlength={300}
          onInput={(event) => setInput(String(event.detail.value))}
        />
        <Button className="primary-button" onClick={send}>发送</Button>
      </View>

      <Button className="ghost-button" onClick={() => setMessages([welcome])}>清空当前模拟对话</Button>
    </View>
  );
}
