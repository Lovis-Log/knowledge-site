---
slug: "3-2-dot-cross-and-mixed-products"
title: "3.2 向量的内积、外积及混合积"
summary: "向量的数量积、向量积与混合积。"
updatedAt: "2026-11-17"
content_type: "reference"
group: "course"
displayNumber: "3.2"
tags:
  - "解析几何"
---

本节引入三种乘积：内积把两个向量变成一个数，外积把两个向量变成一个向量，混合积再与第三个向量做内积得到一个数。三者的几何意义分别是投影、面积与体积，也是后面求平面方程、直线方程和判断共面、垂直、平行的主要工具。

## 两个向量的内积（数量积）

### 从作功引入

设常力 $\vec F$ 作用在一个物体上，物体沿直线由 $M_1$ 移动到 $M_2$。力在位移方向上的分量为 $|\vec F|\cos\theta$（$\theta$ 为 $\vec F$ 与位移 $\overrightarrow{M_1M_2}$ 的夹角），因此所作的功为

$$
W=|\vec F|\,|\overrightarrow{M_1M_2}|\cos\theta .
$$

这说明"两个向量的长度与夹角余弦的乘积"是一个有实际意义的数量，于是抽象成内积。

**定义** 设 $\vec a,\vec b$ 的夹角为 $\theta$（$0\le\theta\le\pi$），称实数

$$
\vec a\cdot\vec b=|\vec a|\,|\vec b|\cos\theta
$$

为 $\vec a$ 与 $\vec b$ 的**内积**（数量积）。

由定义可以直接得到几条常用结论：

1. 向量 $\vec a$ 在 $\vec b$ 上的投影可用内积表示：
   $$
   \Pi_{\vec b}\vec a=|\vec a|\cos\theta=\vec a\cdot\vec b^0,
   $$
   其中 $\vec b^0=\dfrac{\vec b}{|\vec b|}$ 是 $\vec b$ 方向的单位向量。
2. $\vec a\perp\vec b\iff \vec a\cdot\vec b=0$。因为 $\theta=\frac\pi2$ 时 $\cos\theta=0$，反之若内积为零且两向量非零，则 $\cos\theta=0$。
3. $\vec a\cdot\vec a=|\vec a|^2$，从而 $|\vec a|=\sqrt{\vec a\cdot\vec a}$。
4. 当 $\vec a\ne\vec 0,\vec b\ne\vec 0$ 时，
   $$
   \cos\langle\vec a,\vec b\rangle=\frac{\vec a\cdot\vec b}{|\vec a|\,|\vec b|}.
   $$

### 内积的性质

对任意向量 $\vec a,\vec b,\vec c$ 和实数 $\lambda$：

1. $\vec a\ne\vec 0\iff \vec a\cdot\vec a>0$；
2. $\vec a\cdot\vec b=\vec b\cdot\vec a$（交换律）；
3. $(\lambda\vec a)\cdot\vec b=\lambda(\vec a\cdot\vec b)=\vec a\cdot(\lambda\vec b)$；
4. $(\vec a+\vec b)\cdot\vec c=\vec a\cdot\vec c+\vec b\cdot\vec c$（分配律）。

这些性质都可从定义和投影的线性性推出。特别地，内积不满足消去律：$\vec a\cdot\vec b=\vec a\cdot\vec c$ 且 $\vec a\ne\vec 0$ 只能推出 $\vec a\cdot(\vec b-\vec c)=0$，即 $\vec b-\vec c$ 与 $\vec a$ 垂直，不能推出 $\vec b=\vec c$。

### 坐标表示

在空间直角坐标系 $Oxyz$ 中，若 $\vec a=(a_1,a_2,a_3)$，$\vec b=(b_1,b_2,b_3)$，则

$$
\vec a\cdot\vec b=a_1b_1+a_2b_2+a_3b_3.
$$

**为什么成立**：把 $\vec a,\vec b$ 按基本向量分解，利用分配律展开：

$$
(\vec a\cdot\vec b)
=(a_1\vec i+a_2\vec j+a_3\vec k)\cdot(b_1\vec i+b_2\vec j+b_3\vec k).
$$

由于 $\vec i\cdot\vec i=\vec j\cdot\vec j=\vec k\cdot\vec k=1$，而 $\vec i\cdot\vec j=\vec j\cdot\vec k=\vec k\cdot\vec i=0$，展开后只剩同类项，即得 $a_1b_1+a_2b_2+a_3b_3$。于是内积的计算完全化为坐标的乘加，不再需要先求夹角。

## 两个向量的外积（向量积）

### 定义

给定两个不共线的非零向量 $\vec a,\vec b$，同时垂直于 $\vec a,\vec b$ 的非零向量位于同一条直线上，但可以指向直线两端。要唯一确定一个向量，还需规定方向和长度。

**定义** $\vec a$ 与 $\vec b$ 的**外积** $\vec a\times\vec b$ 是满足以下三条的向量：

1. $\vec a\times\vec b$ 同时垂直于 $\vec a$ 和 $\vec b$；
2. $\vec a,\vec b,\vec a\times\vec b$ 依次构成右手系；
3. $|\vec a\times\vec b|=|\vec a|\,|\vec b|\sin\theta$，其中 $\theta$ 为 $\vec a$ 与 $\vec b$ 的夹角。

条件 3 中的长度等于以 $\vec a,\vec b$ 为邻边的平行四边形的面积，也等于三角形 $\triangle OAB$ 面积的两倍（$O$ 为公共起点，$A,B$ 分别为 $\vec a,\vec b$ 的终点）。

由定义立得：

1. $\vec a\times\vec a=\vec 0$；
2. $\vec a\times\vec b=-(\vec b\times\vec a)$（反交换律）；
3. $\vec a\parallel\vec b\iff \vec a\times\vec b=\vec 0$；
4. $\vec i\times\vec j=\vec k$，$\vec j\times\vec k=\vec i$，$\vec k\times\vec i=\vec j$。

第 3 条对共线向量也成立：$\theta=0$ 或 $\pi$ 时 $\sin\theta=0$，外积为零向量。

### 外积的性质

1. $\vec a\times\vec a=\vec 0$；
2. $\vec a\times\vec b=-\vec b\times\vec a$；
3. $(\lambda\vec a)\times\vec b=\lambda(\vec a\times\vec b)=\vec a\times(\lambda\vec b)$；
4. $(\vec a+\vec b)\times\vec c=\vec a\times\vec c+\vec b\times\vec c$。

反交换律的几何原因是：交换 $\vec a,\vec b$ 的次序后，右手系的方向反转，长度不变，所以向量取反。这也提醒我们外积**不满足交换律**，书写时次序不能随意调换。

### 坐标表示

设 $\vec a=(a_1,a_2,a_3)$，$\vec b=(b_1,b_2,b_3)$，则

$$
\vec a\times\vec b=(a_2b_3-a_3b_2,\ a_3b_1-a_1b_3,\ a_1b_2-a_2b_1).
$$

推导时把 $\vec a,\vec b$ 按基本向量展开，利用分配律和 $\vec i\times\vec j=\vec k$ 等基本关系，例如

$$
a_1\vec i\times b_2\vec j=a_1b_2\vec k,\qquad
a_2\vec j\times b_1\vec i=-a_2b_1\vec k,
$$

合并即得第三分量 $a_1b_2-a_2b_1$；其余分量同理。

为便于记忆，借用行列式记号写成

$$
\vec a\times\vec b=
\begin{vmatrix}
\vec i & \vec j & \vec k\\
a_1 & a_2 & a_3\\
b_1 & b_2 & b_3
\end{vmatrix}.
$$

按第一行展开时注意第二项带负号，这正好对应反交换律；行列式在这里只是记忆工具，计算结果仍是一个向量。

### 例：求三角形面积

给定三点 $A(1,2,3)$，$B(3,4,5)$，$C(2,4,7)$，求 $\triangle ABC$ 的面积 $S$。

**解** 取从同一点 $C$ 出发的两边：

$$
\vec a=\overrightarrow{CA}=(-1,-2,-4),\qquad
\vec b=\overrightarrow{CB}=(1,0,-2).
$$

计算外积：

$$
\begin{aligned}
\vec a\times\vec b
&=\left(
\begin{vmatrix}-2&-4\\0&-2\end{vmatrix},
-\begin{vmatrix}-1&-4\\1&-2\end{vmatrix},
\begin{vmatrix}-1&-2\\1&0\end{vmatrix}
\right)\\
&=(4,\ -6,\ 2).
\end{aligned}
$$

所以

$$
S=\frac12|\vec a\times\vec b|
=\frac12\sqrt{4^2+(-6)^2+2^2}
=\frac12\sqrt{56}
=\sqrt{14}.
$$

**为什么这样算**：$\triangle ABC$ 的两边 $\overrightarrow{CA},\overrightarrow{CB}$ 张成一个平行四边形，其面积为 $|\vec a\times\vec b|$，三角形面积正好是它的一半。选从同一点出发的两边很关键；若取 $\overrightarrow{AB}$ 与 $\overrightarrow{AC}$，同样可以，但两条边必须共起点，否则叉积不表示该三角形的面积。

## 三个向量的混合积

### 定义与几何意义

三个向量 $\vec a,\vec b,\vec c$ 的**混合积**记作 $(\vec a,\vec b,\vec c)$，规定为

$$
(\vec a,\vec b,\vec c)=(\vec a\times\vec b)\cdot\vec c .
$$

它是一个数。几何上，$|\vec a\times\vec b|$ 是以 $\vec a,\vec b$ 为邻边的平行四边形的面积，再乘 $\vec c$ 在 $\vec a\times\vec b$ 方向上的投影的绝对值，就是以 $\vec a,\vec b,\vec c$ 为棱的平行六面体的体积：

$$
V=|\vec a|\,|\vec b|\sin\alpha\cdot|\vec c|\,|\cos\theta|
=|\vec a\times\vec b|\,|\vec c|\,|\cos\theta|
=|(\vec a,\vec b,\vec c)|,
$$

其中 $\alpha$ 是 $\vec a,\vec b$ 的夹角，$\theta$ 是 $\vec c$ 与 $\vec a\times\vec b$ 的夹角。

若 $\vec a,\vec b,\vec c$ 构成右手系，则 $V=(\vec a,\vec b,\vec c)$；否则 $V=-(\vec a,\vec b,\vec c)$。因此混合积的符号反映了三个向量所成定向，而体积取绝对值。

由体积意义立即得到共面判据：**三个向量共面当且仅当它们的混合积为零**。因为此时平行六面体被压扁，体积为零。

### 坐标表示

设 $\vec a=(a_1,a_2,a_3)$，$\vec b=(b_1,b_2,b_3)$，$\vec c=(c_1,c_2,c_3)$，则

$$
(\vec a,\vec b,\vec c)=
\begin{vmatrix}
a_1 & a_2 & a_3\\
b_1 & b_2 & b_3\\
c_1 & c_2 & c_3
\end{vmatrix}
=
\begin{vmatrix}
a_1 & b_1 & c_1\\
a_2 & b_2 & c_2\\
a_3 & b_3 & c_3
\end{vmatrix}.
$$

第一个等号来自"外积的坐标公式再与 $\vec c$ 作内积"，第二个等号说明行列式转置不改变值。因此混合积对三个向量是**轮换对称**的：

$$
(\vec a,\vec b,\vec c)=(\vec b,\vec c,\vec a)=(\vec c,\vec a,\vec b),
$$

但交换任意两个向量会变号，例如 $(\vec b,\vec a,\vec c)=-(\vec a,\vec b,\vec c)$。

### 例：求平行六面体体积

设 $\vec a=\vec i+\vec j$，$\vec b=\vec j+\vec k$，$\vec c=\vec k+\vec i$，三向量起点同为 $O$，求以它们为棱的平行六面体的体积 $V$。

**解** 三向量的坐标分别为 $(1,1,0)$，$(0,1,1)$，$(1,0,1)$，于是

$$
(\vec a,\vec b,\vec c)=
\begin{vmatrix}
1 & 1 & 0\\
0 & 1 & 1\\
1 & 0 & 1
\end{vmatrix}
=1\cdot(1\cdot1-1\cdot0)-1\cdot(0\cdot1-1\cdot1)+0
=2.
$$

所以

$$
V=|(\vec a,\vec b,\vec c)|=2.
$$

体积为正数，混合积的符号只说明定向；若题目只问体积，最后要取绝对值。

### 例：四点共面条件

当 $k$ 为何值时，四点 $P(2,0,1)$，$A(1,2,3)$，$B(2,3,1)$，$C(3,1,k)$ 共面？

**解** 以 $P$ 为公共起点，令

$$
\vec a=\overrightarrow{PA}=(-1,2,2),\qquad
\vec b=\overrightarrow{PB}=(0,3,0),\qquad
\vec c=\overrightarrow{PC}=(1,1,k-1).
$$

四点共面等价于三向量共面，即混合积为零：

$$
(\vec a,\vec b,\vec c)=
\begin{vmatrix}
-1 & 2 & 2\\
0 & 3 & 0\\
1 & 1 & k-1
\end{vmatrix}
=-3(k+1).
$$

计算时沿第二行展开最省力：只有 $3$ 这一项非零，其余子式为 $(-1)(k-1)-2\cdot1=-k-1$，乘以 $3$ 得 $3(-k-1)=-3k-3$，与上式一致。令 $-3(k+1)=0$，得

$$
k=-1.
$$

所以当 $k=-1$ 时，$\vec a,\vec b,\vec c$ 共面，从而 $P,A,B,C$ 四点共面。

**思路**：判断四点共面，先选一个点作公共起点，把另外三点化成三个向量；四点共面就转化为三向量共面，再用混合积为零的判据。不要直接对四个点的坐标拼行列式，那样没有几何依据。

## 课堂小结

内积的结果是数，核心公式 $\vec a\cdot\vec b=|\vec a||\vec b|\cos\theta=a_1b_1+a_2b_2+a_3b_3$，用来算夹角、投影、长度和判断垂直。外积的结果是向量，长度是以两向量为邻边的平行四边形面积，方向由右手系确定，坐标计算用行列式记号最方便；它用来求面积、找同时垂直于两个向量的方向、判断平行。混合积 $(\vec a,\vec b,\vec c)=(\vec a\times\vec b)\cdot\vec c$ 的结果是数，绝对值是平行六面体体积，等于三阶行列式，用来判断三向量（或四点）共面。易错点：外积反交换，交换次序要变号；面积、体积最后取绝对值；判断四点共面必须先化成同起点的三个向量。

## 资料

[课件原件：3.2 向量的内积、外积及混合积 (1).pptx](<https://docs.google.com/presentation/d/173b8yZ-2gcXXE0DZwxq2plHSFZ9e2ouK/edit?usp=drivesdk&ouid=109132636810390340175&rtpof=true&sd=true>)
