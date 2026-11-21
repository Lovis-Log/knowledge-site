---
slug: "3-4-lines-in-space"
title: "3.4 空间直线及其方程"
summary: "空间直线的对称式与参数式方程，以及线面关系。"
updatedAt: "2026-11-17"
content_type: "reference"
group: "course"
displayNumber: "3.4"
tags:
  - "解析几何"
sources:
  - kind: article
    title: "3.4 空间直线及其方程 (1).pptx"
    url: "https://docs.google.com/presentation/d/11gGFzwABrsjnxfCjjrP90IEPGMzPw30O/edit?usp=drivesdk&ouid=109132636810390340175&rtpof=true&sd=true"
---

空间直线可以由"一个点 + 一个方向"确定，得到点向式（对称式）与参数式；也可以看成两个不平行的平面的交线，得到一般方程。本节还讨论直线与平面、两条直线之间的位置关系，以及夹角和距离。

## 直线方程

### 点向式（对称式）方程

**定义** 平行于直线的一个非零向量称为直线的**方向向量**。

设直线 $L$ 过点 $M_0(x_0,y_0,z_0)$，方向向量为 $\vec d=(m,n,p)$。对空间任一点 $M(x,y,z)$，

$$
M\in L\iff \overrightarrow{M_0M}\parallel\vec d
\iff \overrightarrow{M_0M}=t\vec d\quad(t\in\mathbb R).
$$

把坐标写开，得到

$$
\frac{x-x_0}{m}=\frac{y-y_0}{n}=\frac{z-z_0}{p},
$$

称为直线的**点向式方程**（也称**对称式方程**）。

注意 $m,n,p$ 中可以有零。若 $m=0$，则方程应理解为 $x-x_0=0$，即 $x=x_0$；形式上把 $\frac{x-x_0}{0}$ 看成"分母为零、分子必须为零"的记号。例如

$$
\frac{x-1}{0}=\frac{y-2}{2}=\frac{z-3}{-3}
$$

表示过点 $(1,2,3)$、方向向量为 $(0,2,-3)$ 的直线，即该直线在平面 $x=1$ 内。

若 $m,n,p$ 中只有一个不为零，例如

$$
\frac{x-x_0}{0}=\frac{y-y_0}{0}=\frac{z-z_0}{p},
$$

则直线为两个特殊平面的交线：

$$
\begin{cases}
x=x_0,\\
y=y_0,
\end{cases}
$$

即过 $(x_0,y_0,0)$ 且平行于 $z$ 轴的直线。

### 例：过两点的直线

求过 $A(1,2,3)$，$B(3,2,1)$ 两点的直线方程。

**解** 取方向向量

$$
\vec d=\overrightarrow{AB}=(2,0,-2),
$$

可取与之平行的 $(1,0,-1)$。由点向式，过 $A$：

$$
\frac{x-1}{1}=\frac{y-2}{0}=\frac{z-3}{-1}.
$$

这里 $y-2=0$，即 $y=2$；直线在平面 $y=2$ 内。

### 例：与两平面平行的直线

求过 $A(1,0,-1)$ 且与两平面

$$
\pi_1:x+2y-z=0,\qquad \pi_2:2x-y-z=1
$$

都平行的直线方程。

**解** 所求直线平行于两个平面，故其方向向量同时垂直于两平面的法向量 $\vec n_1=(1,2,-1)$，$\vec n_2=(2,-1,-1)$，取

$$
\vec d=\vec n_1\times\vec n_2
=\left(
\begin{vmatrix}2&-1\\-1&-1\end{vmatrix},
-\begin{vmatrix}1&-1\\2&-1\end{vmatrix},
\begin{vmatrix}1&2\\2&-1\end{vmatrix}
\right)
=(-3,-1,-5).
$$

方向向量可以取相反方向，也可取 $(3,1,5)$。由点向式，

$$
\frac{x-1}{3}=\frac{y}{1}=\frac{z+1}{5}.
$$

**为什么取外积**：直线与两个平面都平行，意味着方向向量与两个法向量都垂直；两个不共线法向量的外积正是同时垂直于它们的向量。若两平面平行，则 $\vec n_1\times\vec n_2=\vec 0$，此时条件不能确定唯一方向，需另行判断。

### 参数方程

在点向式中令比值为 $t$：

$$
\frac{x-x_0}{m}=\frac{y-y_0}{n}=\frac{z-z_0}{p}=t,
$$

则

$$
\begin{cases}
x=x_0+mt,\\
y=y_0+nt,\\
z=z_0+pt,
\end{cases}
\qquad t\in\mathbb R.
$$

这称为直线的**参数方程**，$t$ 为参数。参数式在求交点、投影、距离时特别方便：把 $x,y,z$ 用同一个 $t$ 表示，代入平面或曲面方程即可解出 $t$。

### 例：求点在平面上的投影

求 $A(1,2,3)$ 在平面 $\pi:x-y+2z+1=0$ 上的投影点 $A'$ 的坐标。

**解** 过 $A$ 且垂直于 $\pi$ 的直线以 $\pi$ 的法向量 $\vec n=(1,-1,2)$ 为方向向量，参数方程为

$$
\begin{cases}
x=1+t,\\
y=2-t,\\
z=3+2t.
\end{cases}
$$

代入平面方程：

$$
(1+t)-(2-t)+2(3+2t)+1=0
\implies 6t+6=0
\implies t=-1.
$$

代回直线方程得

$$
x=0,\qquad y=3,\qquad z=1,
$$

即 $A'(0,3,1)$。

**思路**：投影点就是过 $A$ 的垂线与平面的交点。垂线的方向向量正是平面的法向量，因此写出参数式再代入平面方程，是求投影最直接的方法。

### 两点式方程

已知直线过两个相异点 $P_0(x_0,y_0,z_0)$，$P_1(x_1,y_1,z_1)$，则直线过 $P_0$，且以 $\overrightarrow{P_0P_1}$ 为方向向量，方程为

$$
\frac{x-x_0}{x_1-x_0}=\frac{y-y_0}{y_1-y_0}=\frac{z-z_0}{z_1-z_0}.
$$

这称为直线的**两点式方程**，是点向式的特例。

### 一般方程

空间直线 $L$ 可以看成两个不平行的平面 $\pi_1,\pi_2$ 的交线：

$$
L:\ \begin{cases}
A_1x+B_1y+C_1z+D_1=0 & (\pi_1),\\
A_2x+B_2y+C_2z+D_2=0 & (\pi_2),
\end{cases}
$$

其中 $A_1:B_1:C_1\ne A_2:B_2:C_2$（两平面不平行）。这称为直线的**一般方程**。它的方向向量为两平面法向量的外积：

$$
\vec d=\vec n_1\times\vec n_2.
$$

因为 $L$ 同时在两个平面内，方向向量必须同时垂直于两个法向量。

### 例：一般方程化为点向式

将直线

$$
\begin{cases}
x-y+z=0,\\
x+y-2z=2
\end{cases}
$$

化为点向式方程。

**解法 1（先求一点，再求方向向量）**

令 $z=0$，方程变为

$$
\begin{cases}
x-y=0,\\
x+y=2,
\end{cases}
$$

解得 $x=y=1$，即直线过点 $(1,1,0)$。方向向量为

$$
\vec d=(1,-1,1)\times(1,1,-2)=(1,3,2).
$$

所以

$$
\frac{x-1}{1}=\frac{y-1}{3}=\frac{z}{2}.
$$

**解法 2（求两个点）**

令 $z=0$ 得点 $(1,1,0)$；令 $z=1$，方程变为

$$
\begin{cases}
x-y=-1,\\
x+y=4,
\end{cases}
$$

解得 $x=\frac32$，$y=\frac52$，得点 $\left(\frac32,\frac52,1\right)$。由两点式，

$$
\frac{x-1}{\frac12}=\frac{y-1}{\frac32}=\frac{z}{1}.
$$

**解法 3（把 $z$ 看作参数）**

由原方程解出 $x,y$：

$$
\begin{cases}
x=\dfrac{z+2}{2}=1+\dfrac z2,\\[2mm]
y=\dfrac{3z+2}{2}=1+\dfrac{3z}{2}.
\end{cases}
$$

令 $z=t$，得参数方程

$$
\begin{cases}
x=1+\dfrac t2,\\[1mm]
y=1+\dfrac{3t}{2},\\[1mm]
z=t.
\end{cases}
$$

消去 $t$ 即得与解法 1 相同的点向式。三种方法本质上一致：解法 1 最直接，解法 3 把"消元"过程显式写成了参数式，适合后续代入其他方程。

## 直线与平面的位置关系

设直线

$$
L:\ \frac{x-x_0}{m}=\frac{y-y_0}{n}=\frac{z-z_0}{p},
$$

平面

$$
\pi:\ Ax+By+Cz+D=0,
$$

方向向量 $\vec d=(m,n,p)$，法向量 $\vec n=(A,B,C)$。位置关系由 $\vec d$ 与 $\vec n$ 的关系以及点 $M_0(x_0,y_0,z_0)$ 是否在平面上决定：

1. **直线在平面内**：
   $$
   L\subset\pi\iff \vec d\perp\vec n\ \text{且}\ M_0\in\pi
   \iff mA+nB+pC=0\ \text{且}\ Ax_0+By_0+Cz_0+D=0;
   $$
2. **直线与平面平行**：
   $$
   L\parallel\pi\iff \vec d\perp\vec n\ \text{且}\ M_0\notin\pi
   \iff mA+nB+pC=0\ \text{且}\ Ax_0+By_0+Cz_0+D\ne0;
   $$
3. **直线与平面相交**：
   $$
   L\cap\pi\ \text{为一点}\iff \vec d\ \text{与}\ \vec n\ \text{不垂直}
   \iff mA+nB+pC\ne0;
   $$
4. **直线与平面垂直**：
   $$
   L\perp\pi\iff \vec d\parallel\vec n
   \iff \frac{A}{m}=\frac{B}{n}=\frac{C}{p}.
   $$

判断"在平面内"与"平行"时，只看方向向量垂直于法向量还不够，必须再代一个点；这是最容易漏掉的一步。垂直时方向向量与法向量平行，直线方向就是平面的法线方向。

> **条件**：比值写法 $\dfrac{A}{m}=\dfrac{B}{n}=\dfrac{C}{p}$ 只在 $m,n,p$ 全不为零时直接按比例理解。若方向向量或法向量有分量为零，应改用向量平行条件 $\vec d\times\vec n=\vec 0$（即两组分量成比例，允许零对零）来判断，不能机械地写分母为零的比值。

## 两条直线间的关系

设

$$
L_1:\ \frac{x-x_1}{m_1}=\frac{y-y_1}{n_1}=\frac{z-z_1}{p_1},\qquad
L_2:\ \frac{x-x_2}{m_2}=\frac{y-y_2}{n_2}=\frac{z-z_2}{p_2},
$$

方向向量分别为 $\vec d_1=(m_1,n_1,p_1)$，$\vec d_2=(m_2,n_2,p_2)$，点 $P_1(x_1,y_1,z_1)$，$P_2(x_2,y_2,z_2)$。

两条直线要么共面，要么异面。**共面判据**是：$\vec d_1,\vec d_2,\overrightarrow{P_1P_2}$ 三向量共面，即

$$
\begin{vmatrix}
m_1 & n_1 & p_1\\
m_2 & n_2 & p_2\\
x_2-x_1 & y_2-y_1 & z_2-z_1
\end{vmatrix}=0.
$$

当两直线共面时，有重合、平行、相交三种情形：

1. **重合**：
   $$
   L_1=L_2\iff \vec d_1\parallel\vec d_2\parallel\overrightarrow{P_1P_2},
   $$
   即
   $$
   m_1:n_1:p_1=m_2:n_2:p_2=(x_2-x_1):(y_2-y_1):(z_2-z_1);
   $$
2. **平行但不重合**：
   $$
   L_1\parallel L_2\iff \vec d_1\parallel\vec d_2\ \text{但}\ \overrightarrow{P_1P_2}\nparallel\vec d_1,
   $$
   即方向向量成比例，但连接两点的向量不成同一比例；
3. **相交于一点**：
   $$
   L_1\cap L_2\ \text{为一点}
   \iff \vec d_1,\vec d_2,\overrightarrow{P_1P_2}\ \text{共面且}\ \vec d_1\nparallel\vec d_2,
   $$
   即上述行列式为零，但 $m_1:n_1:p_1\ne m_2:n_2:p_2$。

若行列式不为零，则两直线异面，既不平行也不相交。判断时先看方向向量是否平行：平行则只需再看一点是否在另一条直线上；不平行则用混合积判断共面，共面即相交，否则异面。

## 夹角

### 直线与直线的夹角

设两条直线的方向向量为 $\vec d_1,\vec d_2$，它们的夹角为 $\theta$。由于方向向量可以取相反方向，直线的夹角规定为

$$
\varphi=\min\{\theta,\pi-\theta\},
$$

从而 $0\le\varphi\le\frac\pi2$，且

$$
\cos\varphi=\frac{|\vec d_1\cdot\vec d_2|}{|\vec d_1|\,|\vec d_2|}.
$$

绝对值保证取到锐角（或直角）。特别地：

1. $L_1\perp L_2\iff \vec d_1\perp\vec d_2$；
2. $L_1\parallel L_2$ 或重合 $\iff \vec d_1\parallel\vec d_2$。

### 直线与平面的夹角

设直线 $L$ 的方向向量为 $\vec d$，平面 $\Pi$ 的法向量为 $\vec n$，$\vec d$ 与 $\vec n$ 的夹角为 $\theta$。直线与平面的夹角规定为

$$
\varphi=\frac\pi2-\min\{\theta,\pi-\theta\},
$$

即直线与它在平面上的投影所成的角，$0\le\varphi\le\frac\pi2$。于是

$$
\sin\varphi=\frac{|\vec d\cdot\vec n|}{|\vec d|\,|\vec n|}.
$$

这里用的是 $\sin$ 而不是 $\cos$：$\vec d$ 与法向量 $\vec n$ 的夹角与直线和平面所成的角互余，所以余弦变正弦。位置判定：

1. $L\parallel\Pi$ 或 $L\subset\Pi\iff \vec d\perp\vec n$；
2. $L\perp\Pi\iff \vec d\parallel\vec n$。

### 平面与平面的夹角

设两平面法向量为 $\vec n_1,\vec n_2$，夹角为 $\theta$，则两平面的夹角规定为

$$
\varphi=\min\{\theta,\pi-\theta\},
$$

且

$$
\cos\varphi=\frac{|\vec n_1\cdot\vec n_2|}{|\vec n_1|\,|\vec n_2|},
\qquad 0\le\varphi\le\frac\pi2.
$$

两平面垂直等价于法向量垂直，两平面平行等价于法向量平行。

## 距离

### 点到直线的距离

点 $P_0(x_0,y_0,z_0)$ 到直线

$$
L:\ \frac{x-x_1}{m}=\frac{y-y_1}{n}=\frac{z-z_1}{p}
$$

的距离为

$$
d(P_0,L)=\frac{|\vec s\times\overrightarrow{P_1P_0}|}{|\vec s|},
$$

其中 $\vec s=(m,n,p)$ 是 $L$ 的方向向量，$P_1(x_1,y_1,z_1)\in L$。

**证明** 设 $\overrightarrow{P_1P_0}$ 与 $\vec s$ 的夹角为 $\theta$。以 $P_1P_0$ 和方向向量 $\vec s$ 为邻边的平行四边形面积为

$$
|\overrightarrow{P_1P_0}|\,|\vec s|\sin\theta=|\vec s\times\overrightarrow{P_1P_0}|.
$$

点 $P_0$ 到直线的高 $d$ 等于平行四边形面积除以底 $|\vec s|$，故

$$
d=|\overrightarrow{P_1P_0}|\sin\theta
=\frac{|\vec s|\,|\overrightarrow{P_1P_0}|\sin\theta}{|\vec s|}
=\frac{|\vec s\times\overrightarrow{P_1P_0}|}{|\vec s|}.
$$

这个公式把"求垂足"转化为"算外积"，避免了解方程组。

### 点到平面的距离

点 $P_0(x_0,y_0,z_0)$ 到平面 $\pi:Ax+By+Cz+D=0$ 的距离为

$$
d(P_0,\pi)=\frac{|Ax_0+By_0+Cz_0+D|}{\sqrt{A^2+B^2+C^2}}.
$$

**证明** 在平面上任取一点 $P(x,y,z)$，设 $P_0$ 在平面上的投影为 $N$。则 $P_0N\perp\pi$，且 $\overrightarrow{PP_0}$ 与法向量 $\vec n=(A,B,C)$ 的夹角 $\theta$ 满足

$$
d=|P_0N|=|\overrightarrow{PP_0}|\,|\cos\theta|
=\frac{|\overrightarrow{PP_0}\cdot\vec n|}{|\vec n|}.
$$

而

$$
\overrightarrow{PP_0}\cdot\vec n
=A(x_0-x)+B(y_0-y)+C(z_0-z)
=Ax_0+By_0+Cz_0-(Ax+By+Cz).
$$

由于 $P$ 在平面上，$Ax+By+Cz=-D$，代入得

$$
d=\frac{|Ax_0+By_0+Cz_0+D|}{\sqrt{A^2+B^2+C^2}}.
$$

公式的几何意义是：点到平面的距离等于向量 $\overrightarrow{PP_0}$ 在法向量方向上的投影的绝对值；分子就是平面方程在 $P_0$ 处的取值，分母是法向量的长度。

### 其他距离

1. **两条平行直线间的距离**：规定为一条直线上任意一点到另一条直线的距离，可用点到直线的距离公式计算。
2. **两个平行平面间的距离**：规定为一个平面上任意一点到另一个平面的距离，可用点到平面的距离公式计算。
3. **平行于平面的直线与平面间的距离**：规定为直线上任意一点到平面的距离。

这些"规定"成立的共同原因是：在平行条件下，距离处处相等，选哪个点都不会改变结果。

### 两条异面直线的公垂线与距离

两条异面直线间的距离是公垂线上夹在两直线间的线段长度，等于两直线上各取一点所得向量在公垂线方向上的投影绝对值。

**例** 已知两条异面直线

$$
L_1:\ \begin{cases}x=-2t,\\y=1,\\z=-2+t,\end{cases}\quad(t\in\mathbb R),
\qquad
L_2:\ \frac{x+1}{1}=\frac{y+1}{2}=\frac{z-2}{-1}.
$$

求这两条直线的公垂线 $L$ 的方程。

![两异面直线的公垂线 L 与两张辅助平面 π₁、π₂](</course-materials/campus-linear-algebra-analytic-geometry/figures/common-perpendicular.jpg>)

**思路** 公垂线 $L$ 与 $L_1$、$L_2$ 都垂直，所以 $L$ 的方向向量同时垂直于两条直线的方向向量，可直接用外积求出。但只知道方向还不够，$L$ 上一个点也不知道，无法立即写点向式方程。于是把 $L$ 看成两张平面的交线：$L_1$ 与 $L$ 张成平面 $\pi_1$，$L_2$ 与 $L$ 张成平面 $\pi_2$，$L=\pi_1\cap\pi_2$。这两张平面都经过 $L$，且分别包含已知直线，平面上的已知点可以直接使用。求 $\pi_1$ 的法向量时，它要同时垂直于 $L_1$ 的方向与 $L$ 的方向，仍用外积。

**解** $L_1$ 的方向向量与已知点分别为

$$
\vec s_1=(-2,0,1),\qquad P_1(0,1,-2);
$$

$L_2$ 的方向向量与已知点分别为

$$
\vec s_2=(1,2,-1),\qquad P_2(-1,-1,2).
$$

$L$ 的方向向量

$$
\vec s=\vec s_1\times\vec s_2
=\begin{vmatrix}
\vec i&\vec j&\vec k\\
-2&0&1\\
1&2&-1
\end{vmatrix}
=(-2,-1,-4).
$$

取 $\vec s=(2,1,4)$ 也可，只差一个符号。

**求 $\pi_1$**。$\pi_1$ 由 $L_1$ 与 $L$ 张成，其法向量垂直于 $\vec s_1$ 与 $\vec s$，故

$$
\vec n_1=\vec s\times\vec s_1
=(2,1,4)\times(-2,0,1)
=(1,-10,2).
$$

（这里用 $-\vec s=(2,1,4)$ 代替 $\vec s$，法向量整体变号，平面不变。）平面过 $P_1(0,1,-2)$，方程为

$$
1(x-0)-10(y-1)+2(z+2)=0,
$$

即

$$
x-10y+2z+14=0.
$$

**求 $\pi_2$**。同理，$\pi_2$ 的法向量垂直于 $\vec s_2$ 与 $\vec s$：

$$
\vec n_2=(2,1,4)\times(1,2,-1)=(-9,6,3),
$$

可取 $(-3,2,1)$。平面过 $P_2(-1,-1,2)$，方程为

$$
-3(x+1)+2(y+1)+(z-2)=0,
$$

即

$$
-3x+2y+z-3=0.
$$

**公垂线方程** 为两张平面的交线：

$$
L:\ \begin{cases}
x-10y+2z+14=0,\\
-3x+2y+z-3=0.
\end{cases}
$$

**检验**：

- $\vec n_1\cdot\vec s_1=-2+0+2=0$，$\vec n_1\cdot\vec s=-2+10-8=0$，故 $\pi_1$ 确实同时平行于 $L_1$ 与 $L$，且 $P_1$ 满足 $\pi_1$；
- $\vec n_2\cdot\vec s_2=-3+4-1=0$，$\vec n_2\cdot\vec s=6-2-4=0$，故 $\pi_2$ 同时平行于 $L_2$ 与 $L$，且 $P_2$ 满足 $\pi_2$；
- $(\overrightarrow{P_1P_2})\cdot(\vec s_1\times\vec s_2)=(-1,-2,4)\cdot(-2,-1,-4)=2+2-16=-12\ne0$，两直线确为异面直线，公垂线存在且唯一。

**公垂线的垂足与距离**（补充验算）。设垂足 $A\in L_1$、$B\in L_2$，令

$$
A=(-2t,\,1,\,-2+t),\qquad
B=(-1+u,\,-1+2u,\,2-u).
$$

要求 $\overrightarrow{AB}\parallel\vec s$，即

$$
(-1+u+2t,\,-2+2u,\,4-u-t)=\lambda(-2,-1,-4).
$$

由第二式 $\lambda=2-2u$，代入第一、三式得 $t=\dfrac{3u-3}{2}$ 与 $t=12-9u$，解得

$$
u=\frac97,\qquad t=\frac37,\qquad \lambda=-\frac47.
$$

于是

$$
A\left(-\frac67,1,-\frac{11}{7}\right),
\qquad
B\left(\frac27,\frac{11}{7},\frac57\right).
$$

$A,B$ 分别满足两张平面方程，故都在 $L$ 上。两异面直线的距离为

$$
d=|AB|=\frac47\sqrt{(-2)^2+(-1)^2+(-4)^2}
=\frac{4\sqrt{21}}{7}.
$$

用公式核对：

$$
d=\frac{\left|\overrightarrow{P_1P_2}\cdot(\vec s_1\times\vec s_2)\right|}{|\vec s_1\times\vec s_2|}
=\frac{12}{\sqrt{21}}
=\frac{4\sqrt{21}}{7},
$$

一致。

**方法要点**：求公垂线方程不要只停在方向向量上。方向由 $\vec s_1\times\vec s_2$ 得到，位置则由“两条已知直线各配一张过公垂线的平面”补出；两张平面的交线自然就是公垂线。判断两直线是否异面，用混合积 $\overrightarrow{P_1P_2}\cdot(\vec s_1\times\vec s_2)$ 是否为零即可。

### 例：点到平面的距离与投影

求点 $A(1,1,1)$ 到平面 $\pi:x+y+z+1=0$ 的距离 $d$ 及 $A$ 在平面上的投影。

**解** 由点到平面的距离公式，

$$
d=\frac{|1+1+1+1|}{\sqrt{1^2+1^2+1^2}}=\frac{4}{\sqrt3}.
$$

过 $A$ 作垂直于 $\pi$ 的直线，方向向量取 $\vec n=(1,1,1)$，参数方程为

$$
L_1:\ \begin{cases}
x=t+1,\\
y=t+1,\\
z=t+1.
\end{cases}
$$

代入平面方程：

$$
(t+1)+(t+1)+(t+1)+1=0
\implies 3t+4=0
\implies t=-\frac43.
$$

于是投影点为

$$
A'\left(-\frac13,-\frac13,-\frac13\right).
$$

检验：$A'$ 满足 $x+y+z+1=-1+1=0$，且 $|AA'|=\sqrt{3\cdot\left(\frac43\right)^2}=\frac4{\sqrt3}$，与距离公式一致。

### 例：点到直线的距离

求点 $A(1,1,1)$ 到直线

$$
L:\ \frac{x+1}{1}=\frac{y-2}{-1}=\frac{z-1}{-1}
$$

的距离。

**解** 直线上取点 $P(-1,2,1)$，方向向量 $\vec s=(1,-1,-1)$。则

$$
\overrightarrow{PA}=(2,-1,0),
$$

$$
\overrightarrow{PA}\times\vec s
=\left(
\begin{vmatrix}-1&0\\-1&-1\end{vmatrix},
-\begin{vmatrix}2&0\\1&-1\end{vmatrix},
\begin{vmatrix}2&-1\\1&-1\end{vmatrix}
\right)
=(1,2,-1).
$$

所以

$$
d=\frac{|\overrightarrow{PA}\times\vec s|}{|\vec s|}
=\frac{\sqrt{1+4+1}}{\sqrt{1+1+1}}
=\frac{\sqrt6}{\sqrt3}
=\sqrt2.
$$

### 例：直线与平面的夹角

求上述直线 $L$ 与平面 $\pi:x+y+z+1=0$ 的夹角 $\varphi$。

**解** 直线方向向量 $\vec s=(1,-1,-1)$，平面法向量 $\vec n=(1,1,1)$。于是

$$
\sin\varphi=\frac{|\vec s\cdot\vec n|}{|\vec s|\,|\vec n|}
=\frac{|1-1-1|}{\sqrt3\cdot\sqrt3}
=\frac13,
$$

故

$$
\varphi=\arcsin\frac13.
$$

**易错点**：求线面夹角时用 $\sin$，求线线、面面夹角时用 $\cos$；三者都通过绝对值取锐角。若题目问的是"直线与法线的夹角"，则用 $\cos$，不要与线面夹角混淆。

## 课堂小结

空间直线有两套常用方程：点向式（对称式）$\frac{x-x_0}{m}=\frac{y-y_0}{n}=\frac{z-z_0}{p}$ 与参数式，适合已知点和方向；一般方程是两个平面的交线，方向向量为两法向量的外积。直线与平面的位置关系看 $\vec d$ 与 $\vec n$ 是否垂直，再代点区分"在面内"与"平行"；两直线先看方向是否平行，再用混合积判断共面，共面且不平行即相交，否则异面。夹角公式统一用绝对值取锐角，但线线、面面用 $\cos$，线面用 $\sin$。距离方面，点到直线用平行四边形面积 $d=\frac{|\vec s\times\overrightarrow{P_1P_0}|}{|\vec s|}$，点到平面用投影 $d=\frac{|Ax_0+By_0+Cz_0+D|}{\sqrt{A^2+B^2+C^2}}$；平行线、平行平面、线面平行的距离都化归为点线或点面距离。
