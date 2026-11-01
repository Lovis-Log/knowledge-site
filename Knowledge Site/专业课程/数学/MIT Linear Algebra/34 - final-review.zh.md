---
slug: "34-final-review"
title: "期末总复习：用六道旧题串起整门课"
summary: "从秩与可解性、四个子空间、矩阵乘法、正交投影、Markov 过程到最小二乘，每道题对应一条主线，答案背后是同一张四子空间图。"
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "course-review"
  - "least-squares"
  - "markov"
sources:
  - kind: "video"
    title: "34. Final Course Review"
    url: "https://www.youtube.com/watch?v=RWvi4Vx4CDc"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## 复习的方式

最后一讲没有重新讲定义，而是拿旧考题现场推理。每道题都对应课程的一条主线；把它们放在一起，就是一张完整的知识地图。

下面按题型整理，重点不是答案，而是**看到条件后应该先问什么**。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 0:07 | 期末复习的形式 |
| 1:18 | 第一题：由 $Ax=b$ 反推 $m,n,r$ |
| 3:26 | 主元与可解性 |
| 5:01 | 构造满足条件的矩阵 |
| 7:33 | 可逆性与 $A^{\mathsf T}A$ 的秩 |
| 10:26 | $A^{\mathsf T}A$ 的零空间 |
| 14:40 | $A^{\mathsf T}y=c$ 与 $A^{\mathsf T}$ 的零空间 |
| 17:06 | 四个子空间的维数 |
| 18:28 | 线性组合、无关性与零空间 |
| 21:29 | 唯一性取决于零空间 |
| 22:53 | 最近点与投影 |
| 25:02 | 特征值、迹与行列式 |
| 26:54 | 马尔可夫矩阵的稳态 |
| 28:22 | 稳态特征向量的计算 |
| 32:16 | 由性质构造矩阵 |
| 34:26 | $S\Lambda S^{-1}$ 的用法 |
| 35:43 | 有正交特征向量但不对称的矩阵 |
| 38:49 | 最小二乘的解与残差 |
| 41:07 | 让最小二乘解改变的右端向量 |

## 题型一：由可解性反推 m、n、r

### 题目

设 $A$ 是 $3\times n$ 矩阵。已知：

- $Ax=(1,0,0)^{\mathsf T}$ 无解；
- $Ax=(0,1,0)^{\mathsf T}$ 恰有一个解。

问 $m,n,r$ 的关系。

### 推理

1. 右边是三维向量，所以 $m=3$。
2. 存在某个右端无解，说明消元会出现零行，因此 $r<m$，即 $r<3$。
3. 「恰有一个解」说明零空间只有零向量，因此列线性无关，$r=n$。

合起来：

$$
r=n<3.
$$

### 例子

取

$$
A=\begin{bmatrix}0\\1\\0\end{bmatrix}.
$$

它是 $3\times1$，$r=n=1$。列空间是 $y$ 轴，$(0,1,0)$ 在其中且解唯一；$(1,0,0)$ 不在其中，无解。

若想用两列，可以取

$$
A=\begin{bmatrix}0&0\\1&0\\0&1\end{bmatrix},
$$

列空间是 $yz$ 平面，同样满足条件。

## 题型二：关于 $A^{\mathsf T}A$ 与 $AA^{\mathsf T}$ 的真假判断

在上面的设定下（$r=n<3$），判断三条命题。

### 命题一：$\det(A^{\mathsf T}A)=\det(AA^{\mathsf T})$

假。两个矩阵尺寸不同：$A^{\mathsf T}A$ 是 $n\times n$，$AA^{\mathsf T}$ 是 $3\times3$。

只有当 $A$ 是方阵时，$\det(BA)=\det(AB)$ 才成立，并且此时两者都等于 $(\det A)^2$。

### 命题二：$A^{\mathsf T}A$ 可逆

真。因为 $r=n$，列线性无关，$A^{\mathsf T}A$ 是 $n\times n$ 且满秩。

### 命题三：$AA^{\mathsf T}$ 正定

假。$AA^{\mathsf T}$ 是 $3\times3$，但秩只有 $r=n<3$，必然奇异，最多半正定。

对应的例子中 $AA^{\mathsf T}$ 的第一行全为零，显然不正定。

## 题型三：证明 $A^{\mathsf T}y=c$ 总有解

$A^{\mathsf T}$ 是 $n\times3$。因为 $A$ 的列线性无关，$A^{\mathsf T}$ 的行线性无关，所以

$$
\operatorname{rank}(A^{\mathsf T})=n,
$$

行满秩意味着对任意右端都有解。

至于为什么有无穷多解：$A^{\mathsf T}$ 的零空间维数是

$$
m-r=3-r>0,
$$

所以只要有一个解，就能加上零空间中的任意向量，得到无穷多个解。

> 这道题把「行满秩 $\Rightarrow$ 总有解」与「零空间维数 $=m-r$」两条结论合在一起，是典型的综合题。

## 题型四：矩阵乘法与零空间

设 $A$ 的列是 $v_1,v_2,v_3$。

### 解 $Ax=v_1-v_2+v_3$

按列组合的定义，

$$
A\begin{bmatrix}1\\-1\\1\end{bmatrix}
=1\cdot v_1+(-1)\cdot v_2+1\cdot v_3
=v_1-v_2+v_3.
$$

所以

$$
x=\begin{bmatrix}1\\-1\\1\end{bmatrix}.
$$

这是矩阵乘法最基本的事实：$Ax$ 是列向量的线性组合，系数就是 $x$ 的分量。

### 若 $v_1-v_2+v_3=0$

那么上面这个 $x$ 就在 $A$ 的零空间中。于是对任意解，都可以加上它而结果不变：

$$
A(x+kc)=Ax.
$$

所以解不唯一。**唯一性等价于零空间只有零向量。**

## 题型五：正交向量与最近点

设 $v_1,v_2,v_3$ 标准正交。

问：$v_1,v_2$ 的哪个线性组合最接近 $v_3$？

因为 $v_3$ 与 $v_1,v_2$ 都正交，它在 $\operatorname{span}(v_1,v_2)$ 上的投影是零。所以最接近的组合是

$$
0\cdot v_1+0\cdot v_2=0.
$$

用标准基想象：$v_1,v_2,v_3$ 就是 $x,y,z$ 轴，$xy$ 平面上离 $z$ 轴最近的点是原点。

## 题型六：Markov 矩阵与稳态

### 矩阵与特征值

课堂上给出的矩阵满足三个结构性质：

- 每一列元素非负且和为 $1$（Markov 性质）；
- 第一列加第二列等于第三列的两倍，因此列线性相关，矩阵奇异；
- 迹为 $0.8$。

由此直接读出三个特征值：

- 因为 Markov，$1$ 一定是特征值；
- 因为奇异，$0$ 是特征值；
- 因为迹等于特征值之和，第三个是 $0.8-1-0=-0.2$。

> 补充：录音中的矩阵数字有噪声。一个满足上述全部条件的具体矩阵是
> $$A=\begin{bmatrix}0.2&0.4&0.3\\0.4&0.2&0.3\\0.4&0.4&0.4\end{bmatrix}.$$
> 它的列和为 $1$，第一列加第二列等于 $(0.6,0.6,0.8)=2(0.3,0.3,0.4)$，迹为 $0.8$。

### 稳态

设初值 $u_0=(0,10,0)$，考察 $u_k=A^ku_0$。把 $u_0$ 展开成特征向量组合：

$$
u_k=c_1\lambda_1^kx_1+c_2\lambda_2^kx_2+c_3\lambda_3^kx_3.
$$

当 $k\to\infty$，$\lambda_1=0$ 与 $\lambda_3=-0.2$ 的项都趋于零，只剩 $\lambda_2=1$ 的项：

$$
u_\infty=c_2x_2.
$$

求 $\lambda=1$ 的特征向量，解 $(A-I)x=0$ 得

$$
x_2=\begin{bmatrix}3\\3\\4\end{bmatrix}.
$$

### 系数为什么是 1

Markov 矩阵保持总人口不变：

$$
\mathbf 1^{\mathsf T}Au=\mathbf 1^{\mathsf T}u.
$$

对特征向量 $x_i$，若 $\lambda_i\neq1$，则

$$
\mathbf 1^{\mathsf T}Ax_i=\lambda_i\mathbf 1^{\mathsf T}x_i=\mathbf 1^{\mathsf T}x_i,
$$

所以 $(\lambda_i-1)\mathbf 1^{\mathsf T}x_i=0$，即 $\mathbf 1^{\mathsf T}x_i=0$。也就是说，非 $1$ 特征向量的分量和为零。

初值的分量和是 $10$，$x_2$ 的分量和也是 $10$，因此 $c_2=1$。稳态是

$$
u_\infty=\begin{bmatrix}3\\3\\4\end{bmatrix}.
$$

## 题型七：按性质构造矩阵

| 要求 | 例子 | 理由 |
| --- | --- | --- |
| 投影到过 $a=(4,-3)$ 的直线 | $\dfrac{1}{25}\begin{bmatrix}16&-12\\-12&9\end{bmatrix}$ | $P=\dfrac{aa^{\mathsf T}}{a^{\mathsf T}a}$ |
| 特征值 $0,3$，特征向量 $(1,2),(2,1)$ | $\begin{bmatrix}4&-2\\2&-1\end{bmatrix}$ | $A=S\Lambda S^{-1}$ |
| 不能写成 $B^{\mathsf T}B$ | $\begin{bmatrix}0&1\\0&0\end{bmatrix}$ | $B^{\mathsf T}B$ 必对称 |
| 有正交特征向量但不对称 | $\begin{bmatrix}0&-1\\1&0\end{bmatrix}$ | 反对称矩阵的特征向量正交 |

第三题的要点：$B^{\mathsf T}B$ 永远对称，所以任何非对称矩阵都不可能具有这种形式。

第四题的要点：正交特征向量不只属于对称矩阵。反对称矩阵与正交矩阵同样满足 $AA^{\mathsf T}=A^{\mathsf T}A$，它们的特征向量也可以选成正交（可能是复向量）。

## 题型八：最小二乘的四个追问

### 题目

$$
A=\begin{bmatrix}1&0\\1&1\\1&2\end{bmatrix},\qquad
b=\begin{bmatrix}3\\4\\1\end{bmatrix}.
$$

### 1. 最小二乘解

$$
A^{\mathsf T}A=\begin{bmatrix}3&3\\3&5\end{bmatrix},\qquad
A^{\mathsf T}b=\begin{bmatrix}8\\6\end{bmatrix}.
$$

解正规方程得

$$
\hat x=\begin{bmatrix}11/3\\-1\end{bmatrix}.
$$

### 2. 投影是什么

投影就是最优组合：

$$
p=A\hat x=\frac{11}{3}\begin{bmatrix}1\\1\\1\end{bmatrix}
-\begin{bmatrix}0\\1\\2\end{bmatrix}
=\begin{bmatrix}11/3\\8/3\\5/3\end{bmatrix}.
$$

### 3. 对应的直线

$A$ 的两列分别对应「常数项」和「斜率」，所以这是在拟合

$$
y=\frac{11}{3}-t.
$$

在 $t=0,1,2$ 处，直线给出 $11/3,\,8/3,\,5/3$，与实际值 $3,4,1$ 的误差平方和最小。

### 4. 什么时候最小二乘解为零

要找非零的 $b$，使得最优组合是零向量。这等价于 $b$ 与整个列空间正交。

列空间由 $(1,1,1)$ 与 $(0,1,2)$ 张成。取

$$
b'=\begin{bmatrix}1\\-2\\1\end{bmatrix},
$$

它满足

$$
\begin{bmatrix}1&1&1\end{bmatrix}b'=0,\qquad
\begin{bmatrix}0&1&2\end{bmatrix}b'=0.
$$

所以 $b'$ 与两列都正交，投影为零，最小二乘解为零。

## 整门课的一条主线

把这些题放在一起，可以看到同一条思路反复出现：

1. **秩决定一切**：可解性、唯一性、逆的类型，都由 $r$ 与 $m,n$ 的关系决定。
2. **四个子空间是坐标系**：零空间管唯一性，列空间管可解性，行空间与左零空间管投影与最小二乘。
3. **矩阵乘法就是列的线性组合**：这是所有计算的起点。
4. **特征值描述长期行为**：微分方程看指数，Markov 过程看幂。
5. **特殊矩阵有特殊谱**：对称（实、正交特征向量）、反对称（纯虚）、正交（模长 $1$）、投影（$0$ 或 $1$）、Markov（$1$ 与不超过 $1$）。
6. **SVD 把一般矩阵化归为对角**：伪逆、最小二乘、四个子空间的基，都从它得到。

## 理解检验

**1. 由「某右端无解、另一右端唯一解」如何推出 $r=n<m$？**

参考答案：右端是三维向量，所以 $m=3$。存在一个右端 $Ax=(1,0,0)^{\mathsf T}$ 无解，说明 $A$ 不能对每个 $\mathbf b\in\mathbb R^3$ 都求解，即列空间不是整个 $\mathbb R^3$，于是 $r<m$，也就是 $r<3$。另一方面 $Ax=(0,1,0)^{\mathsf T}$ 恰有一个解，说明零空间只有零向量（否则可加上零空间向量得到更多解），所以列线性无关，$r=n$。合并得 $r=n<3$。注意这里 $n$ 可以是 $1$ 或 $2$，但必须等于 $r$。

**2. 为什么 $A^{\mathsf T}A$ 可逆而 $AA^{\mathsf T}$ 不正定？**

参考答案：$A$ 是 $3\times n$ 且 $r=n$，列线性无关，所以 $A^{\mathsf T}A$ 是 $n\times n$ 且满秩，可逆；由 $x^{\mathsf T}A^{\mathsf T}Ax=\lVert Ax\rVert^2>0$（$x\ne0$）它还正定。而 $AA^{\mathsf T}$ 是 $3\times3$，秩只有 $r=n<3$，所以奇异，必有零特征值，最多半正定，不可能正定。两者尺寸和秩都不同，不能混用；只有 $A$ 为方阵且可逆时，两者才都可逆并互为转置关系。

**3. 若 $v_1-v_2+v_3=0$，$Ax=v_1$ 的解是否唯一？为什么？**

参考答案：不唯一。条件说明向量 $c=(1,-1,1)^{\mathsf T}$ 满足 $Ac=v_1-v_2+v_3=0$，即 $c\in N(A)$，且 $c\ne0$，所以零空间非平凡。$Ax=v_1$ 显然有解 $x=e_1=(1,0,0)^{\mathsf T}$（取第一列为 $v_1$ 的系数）；于是对任意 $k$，
$$
A(e_1+kc)=v_1+k\cdot0=v_1,
$$
得到无穷多个解。唯一性等价于零空间只有零向量，而这里不满足。

**4. Markov 矩阵的非 $1$ 特征向量为什么分量和为零？这如何帮助求稳态系数？**

参考答案：Markov 矩阵每列和为 $1$，即 $\mathbf 1^{\mathsf T}A=\mathbf 1^{\mathsf T}$。对特征向量 $Ax_i=\lambda_ix_i$，两边左乘 $\mathbf 1^{\mathsf T}$：
$$
\lambda_i\mathbf 1^{\mathsf T}x_i=\mathbf 1^{\mathsf T}Ax_i=\mathbf 1^{\mathsf T}x_i,
$$
所以 $(\lambda_i-1)\mathbf 1^{\mathsf T}x_i=0$。当 $\lambda_i\ne1$ 时必有 $\mathbf 1^{\mathsf T}x_i=0$，即分量和为零。求稳态系数时把 $u_0=\sum c_ix_i$ 两边取分量和：非 $1$ 项贡献为零，只剩 $c_2\mathbf 1^{\mathsf T}x_2=\mathbf 1^{\mathsf T}u_0$，于是 $c_2=\mathbf 1^{\mathsf T}u_0/\mathbf 1^{\mathsf T}x_2=10/10=1$。这避免了真正解方程组求系数。

**5. 最小二乘解为零的充要条件是什么？如何构造这样的 $b$？**

参考答案：最小二乘解满足正规方程 $A^{\mathsf T}A\hat x=A^{\mathsf T}b$，所以 $\hat x=0$ 当且仅当 $A^{\mathsf T}b=0$，即 $b$ 与 $A$ 的每一列都正交，也就是 $b\in N(A^{\mathsf T})$（左零空间），等价于 $b\perp C(A)$。构造方法是取一个非零的左零空间向量：本题 $A$ 的列是 $(1,1,1)^{\mathsf T}$ 与 $(0,1,2)^{\mathsf T}$，解 $b_1+b_2+b_3=0$、$b_2+2b_3=0$，取 $b_3=1$ 得 $b_2=-2$、$b_1=1$，即 $b'=(1,-2,1)^{\mathsf T}$。此时投影 $p=A\hat x=0$，最小二乘解 $\hat x=0$。

## 结语

线性代数的力量在于：不同的题目背后是同一组结构。秩、子空间、特征值、分解——掌握这四件事，具体计算只是它们的展开。
