import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { Button, Text, View } from '@tarojs/components';
import { PoopIcon } from '../../components';
import { ATLAS_STORAGE_KEY, roles } from '../../data/content';
import './index.scss';

const starterRoles = ['石子连珠怪', '粗糙硬肠怪', '裂纹香蕉便', '黄金香蕉便之王', '软团团便', '泥浆便便怪', '水样便警报员'];

function readUnlocked() {
  try {
    const stored = Taro.getStorageSync<string[]>(ATLAS_STORAGE_KEY);
    if (Array.isArray(stored)) return Array.from(new Set([...starterRoles, ...stored]));
  } catch {
    // Ignore local preview storage errors.
  }
  return starterRoles;
}

export default function AtlasPage() {
  const [unlocked, setUnlocked] = useState<string[]>(starterRoles);

  useEffect(() => {
    setUnlocked(readUnlocked());
  }, []);

  const clearHidden = () => {
    Taro.setStorageSync(ATLAS_STORAGE_KEY, starterRoles);
    setUnlocked(starterRoles);
  };

  return (
    <View className="page stack atlas-page">
      <View className="card stack">
        <Text className="kicker">Local atlas</Text>
        <Text className="section-title">便便图鉴</Text>
        <Text className="body-text">基础角色默认展示，隐藏角色会在便便厨房合成后用本地存储解锁，不上传服务器。</Text>
        <Text className="body-text">已解锁 {roles.filter((role) => unlocked.includes(role.name)).length} / {roles.length}</Text>
      </View>

      <View className="atlas-grid">
        {roles.map((role) => {
          const isUnlocked = unlocked.includes(role.name);
          return (
            <View className={`atlas-card ${isUnlocked ? '' : 'locked-card'}`} key={role.name}>
              <PoopIcon variant={role.variant} locked={!isUnlocked} label={role.name} />
              <View className="atlas-copy">
                <Text className="kicker">{role.hidden ? '隐藏角色' : '基础角色'}</Text>
                <Text className="section-title">{isUnlocked ? role.name : '未解锁角色'}</Text>
                <Text className="body-text">{isUnlocked ? role.explanation : `提示：${role.trigger}`}</Text>
                {isUnlocked && <Text className="body-text">触发方向：{role.trigger}</Text>}
              </View>
            </View>
          );
        })}
      </View>

      <Button className="danger-button" onClick={clearHidden}>清除隐藏角色解锁进度</Button>
    </View>
  );
}
