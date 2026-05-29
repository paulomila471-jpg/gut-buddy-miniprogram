import { useMemo, useState } from 'react';
import { Button, Text, View } from '@tarojs/components';
import { MedicalNotice, PoopIcon } from '../../components';
import {
  activityOptions,
  dietTags,
  feelings,
  lifestyleReference,
  statusOptions,
  stoolTypes,
  warningOptions,
  waterOptions,
} from '../../data/content';
import './index.scss';

type Draft = {
  stoolId?: number;
  feeling?: string;
  water?: string;
  activity?: string;
  status?: string;
  diets: string[];
  warnings: string[];
};

const initialDraft: Draft = { diets: [], warnings: [] };

export default function CheckinPage() {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const hasWarning = useMemo(() => draft.warnings.some((item) => item !== '以上都没有'), [draft.warnings]);
  const selectedStool = stoolTypes.find((item) => item.id === draft.stoolId) || stoolTypes[3];

  const toggleArray = (key: 'diets' | 'warnings', value: string) => {
    setDraft((current) => {
      if (key === 'warnings' && value === '以上都没有') return { ...current, warnings: ['以上都没有'] };
      const source = key === 'warnings' ? current[key].filter((item) => item !== '以上都没有') : current[key];
      const next = source.includes(value) ? source.filter((item) => item !== value) : [...source, value];
      return { ...current, [key]: next };
    });
  };

  return (
    <View className="page stack checkin-page">
      <View className="card step-head">
        <Text className="kicker">第 {step} 步 / 共 5 步</Text>
        <Text className="section-title">今日便便打卡</Text>
      </View>

      {step === 1 && (
        <View className="stack">
          <Text className="section-title">今天你的便便更像哪一种？</Text>
          <Text className="body-text">不用上传照片，点击最接近的卡通形态即可。</Text>
          {stoolTypes.map((item) => (
            <Button
              key={item.id}
              className={`stool-card ${draft.stoolId === item.id ? 'selected' : ''}`}
              onClick={() => setDraft((current) => ({ ...current, stoolId: item.id }))}
            >
              <PoopIcon label={item.name} variant={item.variant} />
              <View className="stool-text">
                <Text>{item.id}型：{item.name}</Text>
                <Text>{item.description}</Text>
              </View>
            </Button>
          ))}
        </View>
      )}

      {step === 2 && <ChoiceGroup title="今天拉的时候感觉怎么样？" items={feelings} value={draft.feeling} onPick={(feeling) => setDraft((current) => ({ ...current, feeling }))} />}

      {step === 3 && (
        <View className="stack">
          <ChoiceGroup title="饮水" items={waterOptions} value={draft.water} onPick={(water) => setDraft((current) => ({ ...current, water }))} />
          <ChoiceGroup title="活动" items={activityOptions} value={draft.activity} onPick={(activity) => setDraft((current) => ({ ...current, activity }))} />
          <ChoiceGroup title="作息状态" items={statusOptions} value={draft.status} onPick={(status) => setDraft((current) => ({ ...current, status }))} />
          <TagGroup title="基础饮食标签" items={dietTags} selected={draft.diets} onToggle={(value) => toggleArray('diets', value)} />
        </View>
      )}

      {step === 4 && <TagGroup title="今天是否出现以下需要注意的情况？" items={warningOptions} selected={draft.warnings} onToggle={(value) => toggleArray('warnings', value)} />}

      {step === 5 && (
        <View className="stack">
          {hasWarning ? <MedicalNotice /> : <PoopIcon label={selectedStool.name} variant={selectedStool.variant} />}
          <View className="card stack">
            <Text className="section-title">{hasWarning ? '优先安全提醒' : `${selectedStool.id}型：${selectedStool.name}`}</Text>
            <Text className="body-text">{lifestyleReference(selectedStool.id, hasWarning)}</Text>
          </View>
        </View>
      )}

      <View className="button-row">
        {step > 1 && <Button className="ghost-button" onClick={() => setStep(step - 1)}>返回</Button>}
        {step < 5 && <Button className="primary-button" onClick={() => setStep(step + 1)}>下一步</Button>}
        {step === 5 && <Button className="secondary-button" onClick={() => { setDraft(initialDraft); setStep(1); }}>重新打卡</Button>}
      </View>
    </View>
  );
}

function ChoiceGroup({ title, items, value, onPick }: { title: string; items: string[]; value?: string; onPick: (value: string) => void }) {
  return (
    <View className="card stack">
      <Text className="section-title">{title}</Text>
      <View className="tag-cloud">
        {items.map((item) => (
          <Button key={item} className={`tag ${value === item ? 'selected' : ''}`} onClick={() => onPick(item)}>
            {item}
          </Button>
        ))}
      </View>
    </View>
  );
}

function TagGroup({ title, items, selected, onToggle }: { title: string; items: string[]; selected: string[]; onToggle: (value: string) => void }) {
  return (
    <View className="card stack">
      <Text className="section-title">{title}</Text>
      <View className="tag-cloud">
        {items.map((item) => (
          <Button key={item} className={`tag ${selected.includes(item) ? 'selected' : ''}`} onClick={() => onToggle(item)}>
            {item}
          </Button>
        ))}
      </View>
    </View>
  );
}
