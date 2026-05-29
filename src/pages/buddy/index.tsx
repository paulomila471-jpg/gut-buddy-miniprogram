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
  text: '你好，我是 Gut Buddy。当前为界面体验版，我会用模拟回复展示未来真实 AI 的对话方向：记录排便、饮食、饮水、活动和作息，也会优先提醒警示表现。',
};

export default function BuddyPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([welcome]);

  const send = () => {
    const content = input.trim();
    if (!content) return;
    const reply = createMockReply(content);
    setMessages((current) => [...current, { role: 'user', text: content }, reply]);
    setInput('');
  };

  return (
    <View className="page stack buddy-page">
      <View className="card stack">
        <Text className="kicker">Gut Buddy</Text>
        <Text className="section-title">私人排便习惯小助手</Text>
        <Text className="body-text">当前为界面体验版，回复内容为模拟示例，尚未接入真实 AI。</Text>
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
          placeholder="试试输入：便便硬、火锅、便血、泻药、你能做什么"
          maxlength={300}
          onInput={(event) => setInput(String(event.detail.value))}
        />
        <Button className="primary-button" onClick={send}>发送</Button>
      </View>

      <Button className="ghost-button" onClick={() => setMessages([welcome])}>清空当前模拟对话</Button>
    </View>
  );
}

function createMockReply(content: string): Message {
  if (matches(content, ['便血', '黑便', '肚子很痛', '很痛', '不能放屁', '无法排气', '呕吐', '发热', '高烧'])) {
    return {
      role: 'assistant',
      warning: true,
      text: '你提到了可能需要优先关注的表现。本工具无法判断具体原因，建议及时咨询医疗专业人员；如果症状明显、迅速加重、身体虚弱或疼痛严重，请及时寻求紧急医疗帮助。这里不继续给大量饮食调理内容。',
    };
  }

  if (matches(content, ['泻药', '药物', '保健品', '排毒茶', '益生菌品牌', '剂量'])) {
    return {
      role: 'assistant',
      text: '我不能提供具体药物剂量、泻药使用方案、保健品品牌或排毒产品推荐。如果你正在使用医生开具的药物，请不要自行停用或调整。可以把排便形态、次数、饮水、饮食和不适感记录下来，必要时咨询医疗专业人员。',
    };
  }

  if (matches(content, ['便便硬', '硬', '排便费力', '费力', '喝水少', '久坐', '拉不出来'])) {
    return {
      role: 'assistant',
      text: '从生活方式观察角度看，偏硬或费力的体验可能和饮水少、久坐、蔬果或全谷物较少有关。部分人可以尝试规律饮水、增加蔬果或薯类、安排短时间散步，并在有便意时尽量留出上厕所时间。请继续观察变化，不把一次记录当成结论。',
    };
  }

  if (matches(content, ['火锅', '炸鸡', '奶茶', '甜饮', '烧烤', '辣食', '外卖'])) {
    return {
      role: 'assistant',
      text: '这些食物或饮品不需要被羞辱或贴标签。你可以把它们当作生活记录的一部分，温和观察油辣、甜饮、作息变化是否和当天排便体验有关。若只是偶尔发生，可以继续记录；如果持续明显不适，建议咨询医疗专业人员。',
    };
  }

  if (matches(content, ['你好', '怎么记录', '你能做什么', '帮助', '怎么用'])) {
    return {
      role: 'assistant',
      text: '我可以陪你做三件事：第一，记录今天的便便形态、感受、饮食、饮水、活动和作息；第二，提醒你识别便血、黑便、明显腹痛、呕吐发热等需要优先关注的表现；第三，用温和的生活方式参考帮你继续观察习惯变化。当前是模拟体验版，还没有接入真实 AI。',
    };
  }

  return {
    role: 'assistant',
    text: '我先按生活习惯记录来理解：你可以补充今天的便便形态、排便感受、喝水量、活动量、作息和最近吃过的食物。我会尽量用“可能”“部分人”“可以尝试”“继续观察”的方式给出一般参考，不做诊断或治疗建议。',
  };
}

function matches(content: string, words: string[]) {
  return words.some((word) => content.includes(word));
}
