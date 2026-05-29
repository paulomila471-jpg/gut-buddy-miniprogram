import Taro from '@tarojs/taro';
import { useMemo, useState } from 'react';
import { Button, Text, View } from '@tarojs/components';
import { PoopIcon } from '../../components';
import { kitchenIngredients } from '../../data/content';
import './index.scss';

export default function KitchenPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [cooked, setCooked] = useState(false);
  const result = useMemo(() => {
    if (selected.includes('火锅') || selected.includes('炸鸡')) return '火锅烈焰泥浆便';
    if (selected.includes('燕麦') && selected.includes('白水')) return '黄金香蕉便之王';
    if (selected.includes('奶茶')) return '奶茶黏黏便';
    return '软团团便';
  }, [selected]);

  const toggle = (name: string) => {
    setSelected((current) => current.includes(name) ? current.filter((item) => item !== name) : current.length >= 5 ? current : [...current, name]);
  };

  return (
    <View className="page stack kitchen-page">
      <View className="card stack">
        <Text className="kicker">Kitchen game</Text>
        <Text className="section-title">便便厨房</Text>
        <Text className="body-text">游戏结果用于理解生活习惯方向，不代表现实中一定产生对应排便结果。</Text>
      </View>

      {!cooked ? (
        <>
          <View className="card stack">
            <Text className="section-title">选择最多 5 种食材</Text>
            <View className="tag-cloud">
              {kitchenIngredients.map((item) => (
                <Button key={item} className={`tag ${selected.includes(item) ? 'selected' : ''}`} onClick={() => toggle(item)}>
                  {item}
                </Button>
              ))}
            </View>
          </View>
          <Button className="primary-button" disabled={!selected.length} onClick={() => setCooked(true)}>开始合成</Button>
        </>
      ) : (
        <View className="card stack result-card">
          <PoopIcon label={result} />
          <Text className="section-title">{result}</Text>
          <Text className="body-text">这是第一阶段模拟合成结果。后续可以接入完整角色图鉴与本地/服务端解锁状态。</Text>
          <Button className="secondary-button" onClick={() => setCooked(false)}>再合成一锅</Button>
          <Button className="ghost-button" onClick={() => Taro.showToast({ title: '图鉴入口骨架', icon: 'none' })}>图鉴入口</Button>
        </View>
      )}
    </View>
  );
}
