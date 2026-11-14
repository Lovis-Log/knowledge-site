export function AccountAvatar({ username, large = false }: { username: string; large?: boolean }) {
  const initial = Array.from(username.trim())[0]?.toUpperCase() || '?';
  let hash = 0;
  for (const character of username.toLowerCase()) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  const colors = ['#356859', '#68528b', '#356b91', '#985034', '#8b4264', '#556b35'];
  return <span className={`account-avatar${large ? ' account-avatar--large' : ''}`} style={{ backgroundColor: colors[hash % colors.length] }} aria-hidden="true">{initial}</span>;
}
