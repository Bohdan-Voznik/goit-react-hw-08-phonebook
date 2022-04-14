import { AVATARS_IMAGE } from './avatarList';

export function parseData(data) {
  const { id, name, number } = data;
  const result = name.split('/');

  return {
    id,
    number,
    name: result[0],
    isOnline: Boolean(result[1]),
    avatar: AVATARS_IMAGE[Number(result[2])]
      ? AVATARS_IMAGE[Number(result[2])]
      : 'https://img.icons8.com/external-emojis-because-i-love-you-royyan-wijaya/452/external-avatar-hana-emojis-general-emojis-because-i-love-you-royyan-wijaya-8.png',
  };
}
