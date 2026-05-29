import Taro from '@tarojs/taro';
import { useMemo, useState } from 'react';
import { Button, Text, View } from '@tarojs/components';
import { PoopIcon } from '../../components';
import {
  activityOptions,
  ATLAS_STORAGE_KEY,
  kitchenGroups,
  kitchenIngredients,
  roles,
  statusOptions,
  waterOptions,
  type Role,
} from '../../data/content';
import './index.scss';

const starterRoles = ['石子连珠怪', '粗糙硬肠怪', '裂纹香蕉便', '黄金香蕉便之王', '软团团便', '泥浆便便怪', '水样便警报员'];

export default function KitchenPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [water, setWater] = useState('');
  const [activity, setActivity] = useState('');
  const [status, setStatus] = useState('');
  const [result, setResult] = useState<Role | null>(null);
  const selectedItems = useMemo(() => kitchenIngredients.filter((item) => selected.includes(item.name)), [selected]);

  const toggle = (name: string) => {
    setSelected((current) => current.includes(name) ? current.filter((item) => item !== name) : current.length >= 5 ? current : [...current, name]);
  };

  const cook = () => {
    const nextRole = chooseRole(selected, water, activity, status);
    unlockRole(nextRole.name);
    setResult(nextRole);
  };

  return (
    <View className="page stack kitchen-page">
      <View className="card stack">
        <Text className="kicker">Kitchen game</Text>
        <Text className="section-title">便便厨房</Text>
        <Text className="body-text">游戏结果用于理解生活习惯方向，不代表现实中一定产生对应排便结果。</Text>
      </View>

      {!result ? (
        <>
          <View className="card stack">
            <Text className="section-title">选择最多 5 种食材：{selected.length}/5</Text>
            {kitchenGroups.map((group) => (
              <View className="ingredient-group" key={group.title}>
                <Text className="kicker">{group.title}</Text>
                <View className="tag-cloud">
                  {group.names.map((name) => (
                    <Button key={name} className={`tag ${selected.includes(name) ? 'selected' : ''}`} onClick={() => toggle(name)}>
                      {name}
                    </Button>
                  ))}
                </View>
              </View>
            ))}
          </View>

          <Choice title="饮水" value={water} options={waterOptions} onPick={setWater} />
          <Choice title="活动" value={activity} options={activityOptions} onPick={setActivity} />
          <Choice title="作息" value={status} options={statusOptions} onPick={setStatus} />

          <Button className="primary-button" disabled={!selected.length || !water || !activity || !status} onClick={cook}>开始合成</Button>
        </>
      ) : (
        <View className="card stack result-card">
          <PoopIcon label={result.name} variant={result.variant} />
          <Text className="kicker">{result.hidden ? '隐藏角色已解锁' : '基础角色'}</Text>
          <Text className="section-title">{result.name}</Text>
          <Text className="body-text">{result.explanation}</Text>
          <Text className="body-text">触发方向：{result.trigger}</Text>
          <Text className="body-text">本锅食材：{selectedItems.map((item) => item.name).join('、')}</Text>
          <Button className="secondary-button" onClick={() => setResult(null)}>再合成一锅</Button>
          <Button className="ghost-button" onClick={() => Taro.navigateTo({ url: '/pages/atlas/index' })}>查看便便图鉴</Button>
        </View>
      )}
    </View>
  );
}

function Choice({ title, options, value, onPick }: { title: string; options: string[]; value: string; onPick: (value: string) => void }) {
  return (
    <View className="card stack">
      <Text className="section-title">{title}</Text>
      <View className="tag-cloud">
        {options.map((option) => (
          <Button key={option} className={`tag ${value === option ? 'selected' : ''}`} onClick={() => onPick(option)}>
            {option}
          </Button>
        ))}
      </View>
    </View>
  );
}

function chooseRole(selected: string[], water: string, activity: string, status: string) {
  const items = kitchenIngredients.filter((item) => selected.includes(item.name));
  const score = items.reduce(
    (total, item) => ({
      fiber: total.fiber + item.fiber,
      water: total.water + item.water,
      oily: total.oily + item.oily,
      gas: total.gas + item.gas,
      tags: [...total.tags, ...item.tags],
    }),
    { fiber: 0, water: 0, oily: 0, gas: 0, tags: [] as string[] },
  );
  if (water === '几乎没喝水') score.water -= 3;
  if (water === '喝水比较充足') score.water += 3;
  if (activity === '散步或运动了') score.fiber += 1;
  if (activity === '久坐了一整天') score.water -= 1;
  if (status === '熬夜' || status === '压力很大') score.oily += 1;

  const tags = new Set(score.tags);
  const has = (name: string) => selected.includes(name);
  const roleName =
    (tags.has('dragonfruit') && '火龙果彩蛋便') ||
    ((tags.has('hotpot') || tags.has('spicy')) && score.oily >= 5 && '火锅烈焰泥浆便') ||
    (tags.has('milktea') && '奶茶黏黏便') ||
    ((tags.has('bubble') || score.gas >= 6) && '气泡屁屁便') ||
    ((status === '熬夜' || status === '压力很大') && '熬夜打工便') ||
    (selected.filter((name) => ['方便面', '炸鸡', '薯条', '烧烤', '重油外卖'].includes(name)).length >= 2 && '外卖之王便') ||
    (selected.filter((name) => ['绿叶蔬菜', '西兰花', '胡萝卜', '苹果', '梨'].includes(name)).length >= 3 && '绿色森林便') ||
    (activity === '散步或运动了' && (has('白水') || water === '喝水比较充足') && score.fiber >= 5 && '健身达人便') ||
    (activity === '久坐了一整天' && water === '几乎没喝水' && score.fiber <= 2 && '沙发宅宅便') ||
    (has('燕麦') && has('香蕉') && has('酸奶') && '早餐活力便') ||
    baseRoleName(score);

  return roles.find((role) => role.name === roleName) || roles[3];
}

function baseRoleName(score: { fiber: number; water: number; oily: number; gas: number }) {
  if (score.water >= 10 && score.oily >= 3) return '水样便警报员';
  if (score.oily >= 6) return '泥浆便便怪';
  if (score.fiber <= 1 && score.water <= 0) return '石子连珠怪';
  if (score.fiber <= 3 && score.water <= 2) return '粗糙硬肠怪';
  if (score.fiber <= 5 && score.water <= 3) return '裂纹香蕉便';
  if (score.water >= 7) return '软团团便';
  return '黄金香蕉便之王';
}

function unlockRole(roleName: string) {
  try {
    const stored = Taro.getStorageSync<string[]>(ATLAS_STORAGE_KEY);
    const current = Array.isArray(stored) ? stored : starterRoles;
    Taro.setStorageSync(ATLAS_STORAGE_KEY, Array.from(new Set([...starterRoles, ...current, roleName])));
  } catch {
    // H5 preview can continue without storage.
  }
}
