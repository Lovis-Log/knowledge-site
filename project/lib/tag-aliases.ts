export const tagAliases: Record<string, string> = { workflows: 'workflow', 'null-space': 'nullspace', 'catalan-numbers': 'catalan-number', eigenvalue: 'eigenvalues', eigenvector: 'eigenvectors', derivative: 'derivatives', matrices: 'matrix', 'fixed-point': 'fixed-points', 'zero-sum': 'zero-sum-games' };
export const canonicalTag = (tag: string) => tagAliases[tag] ?? tag;
