---
slug: "3-1-space-rectangular-coordinates"
title: "3.1 空间直角坐标系"
summary: "空间直角坐标系，以及向量的坐标与长度、方向。"
updatedAt: "2026-11-17"
content_type: "reference"
group: "course"
displayNumber: "3.1"
tags:
  - "解析几何"
---

解析几何的基本想法是给空间中的点与向量配上数，使几何关系可以用代数运算处理。本节先复习向量的概念与线性运算，再建立空间直角坐标系，把向量写成有序三元数组，并用坐标计算长度、距离与方向。

## 向量的基本概念

**定义** 既有大小又有方向的量称为**向量**，直观上是有方向的线段。以 $A$ 为起点、$B$ 为终点的向量记作 $\overrightarrow{AB}$，也常用 $\vec a,\vec b$ 等小写字母表示。向量 $\overrightarrow{AB}$ 的长度记作 $|\overrightarrow{AB}|$。

长度为 $0$ 的向量称为**零向量**，记作 $\vec 0$；约定零向量的方向任意。长度为 $1$ 的向量称为**单位向量**。与 $\vec a$ 同向的单位向量记作 $\vec a^0$，且

$$
\vec a^0=\frac{1}{|\vec a|}\vec a .
$$

注意这个式子要求 $\vec a\ne\vec 0$：零向量没有确定方向，不能谈"同向的单位向量"。

**向量的相等** 两个向量只要方向相同、长度相等，就规定它们相等，与它们在空间中的位置无关。也就是说，这里研究的是**自由向量**：把向量平行移动后仍视为同一个向量。正因为如此，后面才能把任意向量的起点平移到坐标原点，用终点坐标表示它。

**共线与共面** 若两个向量所在的直线平行，则称这两个向量**共线**或**平行**，记作 $\vec a\parallel\vec b$。若两个向量所在直线互相垂直，则称它们**垂直**，记作 $\vec a\perp\vec b$。若一组向量所在的直线都平行于同一平面，则称这组向量**共面**。

方向相反且长度相等的两个向量互为**相反向量**（逆向量），即 $-\vec a$。

> 零向量与任何向量都共线，因为零向量的方向可以取成与对方相同；但零向量不定义夹角，也不定义"垂直"。

## 向量的线性运算

### 加法与减法

设 $\vec a=\overrightarrow{OA}$，$\vec b=\overrightarrow{OB}$，以 $OA,OB$ 为邻边作平行四边形 $OACB$，对角线向量 $\overrightarrow{OC}$ 定义为 $\vec a$ 与 $\vec b$ 的**和**：

$$
\vec a+\vec b=\overrightarrow{OC}.
$$

这就是**平行四边形法则**。三角形法则与此等价：把 $\vec b$ 的起点移到 $\vec a$ 的终点，则从 $\vec a$ 的起点指向 $\vec b$ 的终点的向量就是 $\vec a+\vec b$。

**差**定义为加相反向量：

$$
\vec a-\vec b=\vec a+(-\vec b)=\overrightarrow{BA}.
$$

差向量是从 $\vec b$ 的终点指向 $\vec a$ 的终点，方向不能颠倒。

### 数乘

设 $\vec a$ 为向量，$\lambda$ 为实数，**数乘** $\lambda\vec a$ 规定为：

1. 当 $\lambda>0$ 时，$\lambda\vec a$ 与 $\vec a$ 同向，$|\lambda\vec a|=\lambda|\vec a|$；
2. 当 $\lambda<0$ 时，$\lambda\vec a$ 与 $\vec a$ 反向，$|\lambda\vec a|=(-\lambda)|\vec a|$；
3. 当 $\lambda=0$ 时，$\lambda\vec a=\vec 0$。

由此得到 $-\vec a=(-1)\vec a$，以及前面给出的单位化公式 $\vec a^0=\dfrac{1}{|\vec a|}\vec a$。

数乘只改变长度、可能改变方向，不改变所在直线，因此 $\lambda\vec a$ 总与 $\vec a$ 共线（$\lambda\ne0$ 时）——这正是"共线"与"成比例"相通的代数基础。

### 线性运算的性质

对任意向量 $\vec a,\vec b,\vec c$ 和实数 $\lambda,\mu$，有

$$
\begin{aligned}
(1)&\quad \vec a+\vec b=\vec b+\vec a,\\
(2)&\quad (\vec a+\vec b)+\vec c=\vec a+(\vec b+\vec c),\\
(3)&\quad \lambda(\vec a+\vec b)=\lambda\vec a+\lambda\vec b,\\
(4)&\quad (\lambda+\mu)\vec a=\lambda\vec a+\mu\vec a,\\
(5)&\quad (\lambda\mu)\vec a=\lambda(\mu\vec a).
\end{aligned}
$$

这些性质都可以由"方向、长度"的定义直接验证；有了坐标表示以后，它们又等价于实数的加法与乘法运算律。

**例** 参照向量 $\vec a$，画出 $-\vec a$，$2\vec a$，$\frac12\vec a$。

作图时分别取与 $\vec a$ 相反、同向且长度为 $2$ 倍、同向且长度为一半的向量即可。三个向量都与 $\vec a$ 共线。

## 向量的夹角与投影

设两个非零向量 $\vec a,\vec b$，把它们平移到同一起点，称它们所成的介于 $0$ 与 $\pi$ 之间的角为 $\vec a$ 与 $\vec b$ 的**夹角**，记作 $\langle\vec a,\vec b\rangle$。于是

$$
0\le \langle\vec a,\vec b\rangle\le\pi .
$$

夹角与向量的先后次序无关：$\langle\vec a,\vec b\rangle=\langle\vec b,\vec a\rangle$。

设 $\vec a,\vec b$ 的夹角为 $\theta$，且 $\vec b\ne\vec 0$。数

$$
\Pi_{\vec b}\vec a=|\vec a|\cos\theta
$$

称为 $\vec a$ 在 $\vec b$ 上的**投影**（数量投影）。它是带符号的：当 $\theta<\frac\pi2$ 时为正，当 $\theta>\frac\pi2$ 时为负，当 $\theta=\frac\pi2$ 时为零。再乘上 $\vec b$ 方向上的单位向量，得到**投影向量**

$$
\Pi_{\vec b}\vec a\,\frac{\vec b}{|\vec b|}.
$$

投影对第一个变量保持线性关系：

$$
\Pi_{\vec b}(\lambda\vec a)=\lambda\Pi_{\vec b}\vec a,\qquad
\Pi_{\vec b}(\vec a+\vec c)=\Pi_{\vec b}\vec a+\Pi_{\vec b}\vec c .
$$

这条性质是"投影保持向量的线性关系不变"的精确含义，也是后面用坐标分量表示向量运算的依据。

## 空间直角坐标系

在空间中取一定点 $O$，过 $O$ 作三条两两互相垂直的数轴 $Ox,Oy,Oz$，使它们构成右手系，就得到**空间直角坐标系** $Oxyz$。三条数轴统称**坐标轴**，$O$ 称为**原点**，三条坐标轴两两确定的平面 $xOy$、$yOz$、$zOx$ 称为**坐标平面**。三个坐标平面把空间分成八个部分，称为八个**卦限**。

**右手系**的判定：伸开右手，四指从 $x$ 轴正方向以小于 $\pi$ 的角度弯向 $y$ 轴正方向，若拇指指向 $z$ 轴正方向，则为右手系；用左手做同样动作得到的是左手系。通常使用右手直角坐标系，本书未特别说明时均指右手系。

在 $Oxyz$ 中，分别与 $x$ 轴、$y$ 轴、$z$ 轴同向的单位向量称为坐标系的**基本向量**（坐标向量），记作 $\vec i,\vec j,\vec k$，它们两两垂直且构成右手系。

### 空间点的坐标

过空间一点 $M$ 分别作三个坐标平面的平行平面，与三条坐标轴交于 $P,Q,R$。设 $P,Q,R$ 在各自数轴上的坐标分别为 $x,y,z$，则有序三元数组 $(x,y,z)$ 称为点 $M$ 的**坐标**。于是

- 坐标轴上的点：$P(x,0,0)$，$Q(0,y,0)$，$R(0,0,z)$；
- 坐标平面上的点：$xOy$ 面上为 $(x,y,0)$，$yOz$ 面上为 $(0,y,z)$，$zOx$ 面上为 $(x,0,z)$；
- 原点的坐标为 $(0,0,0)$。

八个卦限中点的坐标符号依次为：第 I 卦限 $(+,+,+)$，第 II 卦限 $(-,+,+)$，第 III 卦限 $(-,-,+)$，第 IV 卦限 $(+,-,+)$，第 V 卦限 $(+,+,-)$，第 VI 卦限 $(-,+,-)$，第 VII 卦限 $(-,-,-)$，第 VIII 卦限 $(+,-,-)$。记忆时可先按 $z>0$ 的四个卦限逆时针排 I–IV，再按 $z<0$ 对应排 V–VIII。

### 两点间的距离

设 $M_1(x_1,y_1,z_1)$，$M_2(x_2,y_2,z_2)$。在直角三角形 $M_1NM_2$ 和 $M_1PN$ 中两次使用勾股定理（$N$ 是 $M_2$ 在过 $M_1$ 的水平面上的投影，$P$ 为辅助点）：

$$
\begin{aligned}
|M_1M_2|^2
&=|M_1N|^2+|NM_2|^2\\
&=\bigl(|PN|^2+|M_1P|^2\bigr)+|NM_2|^2\\
&=(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2 .
\end{aligned}
$$

开方得**两点间距离公式**

$$
|M_1M_2|=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2}.
$$

推导的要点是：先用水平面上的直角三角形求出底面对角线长，再在竖直的直角三角形中合成空间对角线；这正是平面距离公式向三维的"两次勾股"推广。

## 向量的坐标表示

设 $\vec a=\overrightarrow{BC}$ 是空间中的一个向量。把 $\vec a$ 自由平移，使起点与原点 $O$ 重合，终点的坐标为 $A(a_1,a_2,a_3)$，则有序数组 $(a_1,a_2,a_3)$ 称为向量 $\vec a$ 的**坐标**，记作

$$
\overrightarrow{BC}=(a_1,a_2,a_3).
$$

由于自由向量平移后不变，空间中的向量与有序三元数组一一对应。

设 $B(b_1,b_2,b_3)$，$C(c_1,c_2,c_3)$，则

$$
\overrightarrow{BC}=(c_1-b_1,\ c_2-b_2,\ c_3-b_3).
$$

**任一空间向量的坐标等于终点坐标减去起点坐标。** 这一点可由 $\overrightarrow{BC}=\overrightarrow{OC}-\overrightarrow{OB}$ 看出：平移不改变向量，而两个以原点为起点的向量之差，坐标逐分量相减。

若 $\vec a=(a_1,a_2,a_3)$，则

$$
|\vec a|=\sqrt{a_1^2+a_2^2+a_3^2}.
$$

若 $\vec a=(a_1,a_2,a_3)$，$\vec b=(b_1,b_2,b_3)$，$\lambda\in\mathbb R$，则

$$
\lambda(a_1,a_2,a_3)=(\lambda a_1,\lambda a_2,\lambda a_3),
$$

$$
\vec a\pm\vec b=(a_1\pm b_1,\ a_2\pm b_2,\ a_3\pm b_3).
$$

这说明向量的线性运算与其坐标的线性运算一一对应，向量的几何问题可以转化为数组的代数运算。

### 向量的标准分解

基本向量

$$
\vec i=(1,0,0),\qquad \vec j=(0,1,0),\qquad \vec k=(0,0,1).
$$

任一向量 $(a_1,a_2,a_3)$ 可以写成

$$
\begin{aligned}
(a_1,a_2,a_3)
&=(a_1,0,0)+(0,a_2,0)+(0,0,a_3)\\
&=a_1(1,0,0)+a_2(0,1,0)+a_3(0,0,1)\\
&=a_1\vec i+a_2\vec j+a_3\vec k .
\end{aligned}
$$

这称为向量的**标准分解**，$a_1,a_2,a_3$ 分别是 $\vec a$ 在三个坐标轴上的投影。

### 方向角与方向余弦

向量 $\vec a$ 与基本向量 $\vec i,\vec j,\vec k$ 的夹角 $\alpha,\beta,\gamma$ 称为 $\vec a$ 的**方向角**，$\cos\alpha,\cos\beta,\cos\gamma$ 称为**方向余弦**。由投影定义，

$$
\cos\alpha=\frac{a_1}{|\vec a|}=\frac{a_1}{\sqrt{a_1^2+a_2^2+a_3^2}},
$$

$$
\cos\beta=\frac{a_2}{|\vec a|}=\frac{a_2}{\sqrt{a_1^2+a_2^2+a_3^2}},
$$

$$
\cos\gamma=\frac{a_3}{|\vec a|}=\frac{a_3}{\sqrt{a_1^2+a_2^2+a_3^2}}.
$$

三个方向余弦满足

$$
\cos^2\alpha+\cos^2\beta+\cos^2\gamma=1,
$$

因为分子平方和等于 $|\vec a|^2$。并且

$$
\vec a^0=\frac{1}{|\vec a|}\vec a=(\cos\alpha,\cos\beta,\cos\gamma),
$$

即单位向量的坐标就是方向余弦。方向余弦的平方和为 $1$ 常用来检验方向角是否算错，也说明方向角不能任意取。

## 课堂小结

本节的主线是"几何对象 → 坐标"：向量由方向与长度确定，作为自由向量可平移到原点，从而与有序三元数组一一对应；向量的加减、数乘、长度、投影都化为坐标的相应运算。需要特别注意：零向量方向任意、不能单位化；差向量方向是从减向量终点指向被减向量终点；向量 $\overrightarrow{BC}$ 的坐标是"终点减起点"，不是两个终点坐标的简单拼接；方向余弦满足平方和恒等式。

## 资料

[课件原件：3.1 空间直角坐标系 (1).pptx](</course-materials/campus-linear-algebra-analytic-geometry/lectures/3.1%20%E7%A9%BA%E9%97%B4%E7%9B%B4%E8%A7%92%E5%9D%90%E6%A0%87%E7%B3%BB%20(1).pptx>)
