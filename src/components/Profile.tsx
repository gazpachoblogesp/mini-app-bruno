// src/components/Profile.tsx
// Пример компонента для отображения профиля пользователя

import { useProfile } from '../hooks/useProfile';
import { isRunningInTelegram, getTelegramUser } from '../lib/telegram';
import './Profile.css';

export function Profile() {
  const { profile, loading, error, updateStats } = useProfile();

  // Если не в Telegram, показываем предупреждение
  if (!isRunningInTelegram()) {
    return (
      <div className="profile-warning">
        <h2>⚠️ Предупреждение</h2>
        <p>Это приложение должно быть открыто в Telegram Mini App</p>
        <p>Откройте бота в Telegram и нажмите на кнопку меню</p>
      </div>
    );
  }

  if (loading) {
    return <div className="profile-loading">Загрузка профиля...</div>;
  }

  if (error) {
    return (
      <div className="profile-error">
        <h3>Ошибка</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const telegramUser = getTelegramUser();

  const handleAddXP = async () => {
    try {
      await updateStats({ xp_delta: 10 });
      alert('Добавлено +10 XP!');
    } catch (err) {
      alert('Ошибка при добавлении XP');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        {profile.photo_url && (
          <img 
            src={profile.photo_url} 
            alt={profile.first_name}
            className="profile-avatar"
          />
        )}
        <div className="profile-info">
          <h2>{profile.first_name} {profile.last_name || ''}</h2>
          {profile.username && <p className="profile-username">@{profile.username}</p>}
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <div className="stat-value">{profile.xp}</div>
          <div className="stat-label">XP</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{profile.streak}</div>
          <div className="stat-label">Дней подряд</div>
        </div>
      </div>

      <button onClick={handleAddXP} className="btn-add-xp">
        Добавить 10 XP (тест)
      </button>

      <div className="debug-info">
        <details>
          <summary>Debug Info</summary>
          <pre>{JSON.stringify({ profile, telegramUser }, null, 2)}</pre>
        </details>
      </div>
    </div>
  );
}
