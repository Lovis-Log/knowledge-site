---
slug: "07-mechanical-waves"
title: "机械波"
summary: "行波、波的能量、干涉、驻波和多普勒效应。"
updatedAt: "2026-11-19"
content_type: "reference"
group: "course"
displayNumber: "07"
tags: ["基础物理"]
sources: [{"kind": "article", "title": "第7章1&2节 行波 简谐波.pdf", "url": "https://drive.google.com/file/d/1xkIbNWuOV5OvfRjtGOW6EVP0qolt2P3_/view?usp=drivesdk"}, {"kind": "article", "title": "第7章1&2节 行波 简谐波(2).pdf", "url": "https://drive.google.com/file/d/1A5DjLCSQht_mWIH52Diit6kzknOAg_ks/view?usp=drivesdk"}, {"kind": "article", "title": "第7章3-6节 弹性形变 波速 波的能量 惠更斯原理 波的反射与折射.pdf", "url": "https://drive.google.com/file/d/1CrAB8wXBlL3Rt8ybEeFBYf2WajUK1hFp/view?usp=drivesdk"}, {"kind": "article", "title": "第7章7节1 波的叠加.pdf", "url": "https://drive.google.com/file/d/1OBl3AGRTvWcvRGPwezIswH_vSQX6bmYh/view?usp=drivesdk"}, {"kind": "article", "title": "第7章7节2 驻波.pdf", "url": "https://drive.google.com/file/d/1vV-d8HTPYHODTPrL354Y-utKsxq7vqnd/view?usp=drivesdk"}, {"kind": "article", "title": "第7章7节2 驻波(2).pdf", "url": "https://drive.google.com/file/d/1IYCdg8CkBm7M1EbDaxOewzBytU0L2bI1/view?usp=drivesdk"}, {"kind": "article", "title": "第7章11节 多普勒效应.pdf", "url": "https://drive.google.com/file/d/1R2kIC5MGrGQ8Ry8ax3ROdmKzK5du4dl9/view?usp=drivesdk"}]
---

机械波把振动状态和能量传到远处。在线性简谐波模型中，介质质点在各自的平衡位置附近振动。沿 $+x$ 传播的平面简谐波可写成 $y=A\cos[\omega(t-x/u)+\varphi]$。

本章有两组量特别容易混，必须一开始就分开：

- **波速 $u$ 与质点振动速度 $v$**：前者由媒质性质决定，是振动状态的传播速度；后者由质点自己的振动规律决定，随时间和位置变。
- **波的频率 $\nu$、波速 $u$ 与波长 $\lambda$**：源和界面相对媒质静止时，频率由波源决定，穿过界面时保持不变。波长满足 $\lambda=u/\nu$。

下文采用 $\cos$ 形式。对同一列波，在同一时刻比较时，沿传播方向更下游的点相位滞后。若未指定参考点，初相 $\varphi$ 取在 $x=0$ 处。

## 7.1 行波

### 7.1.1 波的形成与产生条件

振动在媒质中的传播过程叫波动。传播的不是物质本身：媒质中各质点只在各自平衡位置附近振动，沿波线依次把振动状态传下去，因此

> 波传播的是振动状态（相位）和能量，不是物质的迁移。

机械波是机械振动在弹性媒质中的传播过程。产生机械波需要两个条件：

1. **波源**——激起波动的振动系统；
2. **弹性媒质**——能产生弹性形变的连续物质。

两者缺一不可：没有波源，媒质不会自己振；没有媒质（如真空），振动状态无处传递。这也是机械波与电磁波的根本区别。

### 7.1.2 横波与纵波

按质点振动方向与波传播方向的关系，机械波分两类。

**横波**：质点振动方向与波的传播方向垂直。特征是具有交替出现的波峰和波谷。

**纵波**：质点振动方向与波的传播方向平行。特征是具有交替出现的密部和疏部。

![](/course-materials/campus-basic-physics/figures/07-01.png)

能传播哪种波，取决于媒质具有哪种弹性：

- 横波只能在**具有切变弹性**的媒质中传播，即由切变弹性产生，存在于固体中（液面波靠表面张力恢复，也可看作横波；课件写作"固体、液体"，宜按此理解，体相液体内部没有切变弹性）；
- 纵波由**体变或长变弹性**产生，存在于固体、液体、气体中。

### 7.1.3 波射线与波阵面

**波射线（波线）**：波的传播方向。波线上各质点依次先后重复波源的振动，因而各质点振动的相位沿传播方向依次滞后。

**波阵面（波前）**：任一时刻在各方向上振动所传到的所有点组成的集合面，即由振动相位完全相同的质点联结而成的等相面。同一波面上各质点的振动状态完全相同。

![](/course-materials/campus-basic-physics/figures/07-02.png)

按波面形状分为球面波（点波源）和平面波。点波源产生的波在远处的一小部分可视为平面波。在各向同性均匀媒质中，波线垂直于波面。

### 7.1.4 波长、波的频率与波速

**波长** $\lambda$：在振动的一个周期 $T$ 内波所传播的距离，也就是一个完整波的长度。

$$
\lambda=uT=\frac{u}{\nu}
$$

**波的频率** $\nu$：单位时间内向前传播的完整波的数目。

$$
\nu'=\frac{u}{\lambda}=\frac{1}{T}=\nu
$$

即波的频率等于波源的振动频率，与媒质无关。这一点非常关键：波从一种媒质进入另一种媒质时，$\nu$ 不变，$u$ 变，于是 $\lambda$ 必须跟着变，

$$
\lambda_1\nu=u_1,\qquad \lambda_2\nu=u_2\quad\Longrightarrow\quad \frac{\lambda_1}{\lambda_2}=\frac{u_1}{u_2}
$$

后面折射定律的 $\sin i/\sin r=u_1/u_2=\lambda_1/\lambda_2$ 就是由此而来。

作为横波、纵波并存的实际例子：地震时，在地球内部出现的弹性波叫地震波，它像投入水中的石子激起的水波一样向四周扩散。地震波主要包含纵波和横波：振动方向与传播方向一致的为纵波，来自地下的纵波引起地面上下颠簸振动；振动方向与传播方向垂直的为横波，来自地下的横波能引起地面的水平晃动。横波是地震时造成建筑物破坏的主要原因。地震仪记录的就是两类波到达的时间差。

## 7.2 简谐波

### 7.2.1 平面简谐波与波函数

若波源作简谐振动，而媒质均匀无吸收，则在该媒质中传播的平面波称为**平面简谐波**。

**波函数（波动方程）**：能够描述波线上任一质点振动规律的数学表达式。建立它的思路只有一条：

> 波是振动状态的传播，波线上后续质点依次落后地重复前面质点的振动。因此由波线上任一点的振动就可以推出其他点的振动。

### 7.2.2 沿 $+x$ 方向传播的平面简谐波

设 $o$ 点的振动方程为

$$
y_o=A\cos(\omega t+\varphi)
$$

$o$ 点的振动状态传到 $P$ 点（坐标 $x$）所需时间为 $\Delta t=x/u$。$t$ 时刻 $P$ 点的状态，就是 $o$ 点在 $t-x/u$ 时刻的状态，故

$$
y_P=A\cos\left[\omega\left(t-\frac{x}{u}\right)+\varphi\right]
$$

$P$ 是任意点，去掉下标即得平面简谐波方程

$$
y=A\cos\left[\omega\left(t-\frac{x}{u}\right)+\varphi\right]
$$

![](/course-materials/campus-basic-physics/figures/07-03.png)

$P$ 点的初相为

$$
\varphi_P=\varphi-\frac{\omega x}{u}=\varphi-\frac{2\pi x}{\lambda}
$$

比波源落后 $\omega x/u$。这就是"沿传播方向相位依次落后"的定量表达，也是本章判断符号的唯一依据。

### 7.2.3 波函数的物理意义

波函数反映 $y$、$x$、$t$ 三者的关系，描述振动在空间传播这样一个物理过程。分三种看法：

**1. 若 $x$ 不变（令 $x=x_1$）**，则 $y=y(t)$：

$$
y=A\cos\left[\omega t+\left(\varphi-\frac{\omega x_1}{u}\right)\right]=A\cos(\omega t+\varphi_1)
$$

$x$ 为定值时，波函数代表该处质点的振动方程，初相 $\varphi_1=\varphi-\omega x_1/u$，比波源落后 $\omega x_1/u$。

**2. 若 $t$ 不变（令 $t=t_1$）**，则 $y=y(x)$：

$$
y=A\cos\left[(\omega t_1+\varphi)-\frac{\omega x}{u}\right]
$$

表示在 $t_1$ 时刻波线上各质点振动的位移，即该时刻的**波形**。$t$ 取定值时，波函数反映出整个媒质中所有质点在该时刻振动的全貌。

**3. 若 $x$、$y$ 同时变**，则 $y=y(x,t)$，表示确定波形随时间往前移动，即波的传播。把 $t$ 换成 $t+\Delta t$、$x$ 换成 $x+u\Delta t$：

$$
y=A\cos\left\{\omega\left[(t+\Delta t)-\frac{x+u\Delta t}{u}\right]+\varphi\right\}
=A\cos\left[\omega\left(t-\frac{x}{u}\right)+\varphi\right]
$$

![](/course-materials/campus-basic-physics/figures/07-04.png)

即 $t+\Delta t$ 时刻、$x+u\Delta t$ 处的振动位移，与 $t$ 时刻 $x$ 处的振动位移相同。经过 $\Delta t$，波向前传播了 $l=u\Delta t$ 的距离。

### 7.2.4 沿 $-x$ 方向传播

波沿 $-x$ 方向传播时，$x>0$ 一侧质点的振动在时间上比 $o$ 点超前 $x/u$，故

$$
y=A\cos\left[\omega\left(t+\frac{x}{u}\right)+\varphi\right]
$$

**相位差与波程差。** 同一时刻波线上两点 $x_1$、$x_2$ 的相位分别为

$$
\theta_1=\omega t-\frac{\omega}{u}x_1+\varphi,\qquad
\theta_2=\omega t-\frac{\omega}{u}x_2+\varphi
$$

两者之差（按"前点减后点"取）为

$$
\Delta\varphi=\theta_1-\theta_2=\frac{\omega}{u}(x_2-x_1)=\frac{2\pi}{\lambda}\Delta x
$$

即

$$
\boxed{\text{相位差}=\frac{2\pi}{\lambda}\times\text{波程差}}
$$

每多传播一个波长，相位滞后 $2\pi$。

### 7.2.5 波函数的不同形式

利用 $\omega=2\pi\nu=\dfrac{2\pi}{T}$、$u=\dfrac{\lambda}{T}=\nu\lambda$，同一个波函数可以写成多种等价形式。

沿 $+x$ 方向：

$$
y=A\cos\left[\omega\left(t-\frac{x}{u}\right)+\varphi\right]
=A\cos\left[(\omega t-kx)+\varphi\right]
=A\cos\left[2\pi\left(\frac{t}{T}-\frac{x}{\lambda}\right)+\varphi\right]
$$

沿 $-x$ 方向：

$$
y=A\cos\left[\omega\left(t+\frac{x}{u}\right)+\varphi\right]
=A\cos\left[(\omega t+kx)+\varphi\right]
=A\cos\left[2\pi\left(\frac{t}{T}+\frac{x}{\lambda}\right)+\varphi\right]
$$

其中 $k=2\pi/\lambda$ 为角波数。判断符号只需问一句：$x$ 增大时相位是落后还是超前？落后取 $-$，超前取 $+$。

### 7.2.6 判断波形图上各质点速度方向

用波形 $y=f(x-ut)$ 判断沿 $+x$ 传播的波，质点速度满足 $\partial y/\partial t=-u\,\partial y/\partial x$。沿 $-x$ 传播时，波形为 $f(x+ut)$，右侧取正号。因此

- 波沿 $+x$ 传播：曲线**上升段**的质点速度为负（向下），**下降段**的质点速度为正（向上）；
- 波沿 $-x$ 传播：上升段速度为正，下降段速度为负。

口诀："上坡下、下坡上"（沿传播方向看波形）。也可用波形平移法：把整个波形沿传播方向平移一小段，同一 $x$ 处新旧曲线的高低差就是该质点的位移方向。

### 例 7.1 由某点振动方程写波函数

例：已知波线上 $a$ 点的振动方程为 $y_a=A\cos(\omega t+\varphi)$，求该波的波函数。

解：设波沿 $+x$ 方向传播，则 $x$ 点的相位比 $a$ 点落后，波程差为 $x-x_a$，相位差

$$
\Delta\varphi=\frac{2\pi}{\lambda}(x-x_a)
$$

故

$$
y=A\cos\left[\omega t-\frac{2\pi}{\lambda}(x-x_a)+\varphi\right]
$$

若波沿 $-x$ 方向传播，则 $x$ 点的相位比 $a$ 点超前，把上式中的减号改为加号：

$$
y=A\cos\left[\omega t+\frac{2\pi}{\lambda}(x-x_a)+\varphi\right]
$$

要点：这类题不需要重新推波函数，只需回答"$x$ 点比已知点落后还是超前多少相位"。方向反了，符号就反。

### 例 7.2 由 $t=0$ 波形图选波函数

例：一平面简谐波在 $t=0$ 时的波形如图，振幅 $0.01\ \text{m}$，波长 $0.12\ \text{m}$，波速 $0.06\ \text{m/s}$，沿 $-x$ 方向传播。求波函数。

![向左传播的波在 t=0 时的波形，波峰到波谷的距离为 0.06 m](/course-materials/campus-basic-physics/figures/07-05.png)

解（原题为单选，课件未给过程，以下为补解）：先算三个量。

$$
T=\frac{\lambda}{u}=\frac{0.12}{0.06}=2\ \text{s},\qquad
\omega=\frac{2\pi}{T}=\pi\ \text{rad/s}
$$

沿 $-x$ 传播，波函数取

$$
y=A\cos\left(\omega t+\frac{2\pi x}{\lambda}+\varphi\right)
$$

由 $t=0$、$x=0$ 处 $y=0$：

$$
A\cos\varphi=0\Rightarrow\varphi=\pm\frac{\pi}{2}
$$

再由 $t=0$ 时 $x=0$ 处波形上升（$\partial y/\partial x>0$）。此时

$$
\frac{\partial y}{\partial x}=-A\frac{2\pi}{\lambda}\sin\left(\frac{2\pi x}{\lambda}+\varphi\right)
\Bigg|_{x=0}=-A\frac{2\pi}{\lambda}\sin\varphi>0
$$

故 $\sin\varphi<0$，取 $\varphi=-\pi/2$。于是

$$
y=0.01\cos\left(\pi t+\frac{\pi x}{0.06}-\frac{\pi}{2}\right)\ \text{m}
$$

要点：定初相要用两个条件——$y_0$ 定 $\cos\varphi$ 的符号，斜率（或速度）定 $\sin\varphi$ 的符号。只写 $\varphi=\pm\pi/2$ 就停，是这类题最常见的失分点。

### 例 7.3 由波形图作某点的振动曲线

例：一简谐波沿 $+x$ 方向传播，波速 $u$，振幅 $A$，波长 $\lambda$。已知 $t=0$ 时的波形如图，$P$ 点与 $o$ 点相距 $OP=\lambda/4$，且 $t=0$ 时 $y_P=0$。(1) 作出 $P$ 点的振动曲线；(2) 写出 $P$ 点的振动方程。

![t=0 的实线波形向右平移四分之一波长，变为 t=T/4 的虚线](/course-materials/campus-basic-physics/figures/07-06.png)

解：先看 $o$ 点。$t=0$ 时 $o$ 在正最大位移处，相位为 $0$。$P$ 在 $o$ 的右方 $\lambda/4$ 处，沿 $+x$ 传播时右方相位落后

$$
\Delta\varphi=\frac{2\pi}{\lambda}\cdot\frac{\lambda}{4}=\frac{\pi}{2}
$$

故 $t=0$ 时 $P$ 的相位为 $-\pi/2$，即 $y_P=0$ 且正向上运动。这也可以从"$o$ 的状态经 $T/4$ 传到 $P$"直接看出：$t=T/4$ 时 $P$ 到达正最大 $A$。

于是 $P$ 的振动方程为

$$
y_P=A\cos\left(\frac{2\pi}{T}t-\frac{\pi}{2}\right)
$$

振动曲线从 $0$ 出发向上，经 $T/4$ 到 $+A$，再经 $T/4$ 回到 $0$，如此往复。

要点：波形图给的是"某一时刻各点的位置"，振动图给的是"某一点各时刻的位置"。两者转换的桥梁就是相位落后 $\omega x/u$ 这一个式子。

### 例 7.4 由 $t=T/4$ 的波形求各点初相

例：简谐波沿 $+x$ 方向传播，$t=T/4$ 时的波形如图，求 $o,a,b,c$ 各点的初相。

![t=T/4 的波形，o 和 b 分别标出波谷与波峰的横坐标](/course-materials/campus-basic-physics/figures/07-07.png)

解：设各点振动方程为 $y_i=A\cos(\omega t+\varphi_i)=A\cos\theta_i$，$\theta_i$ 为 $t$ 时刻的相位，则

$$
\varphi_i=\theta_i-\omega t=\theta_i-\frac{2\pi}{T}t
$$

代入 $t=T/4$：

$$
\varphi_i=\theta_i-\frac{\pi}{2}
$$

读波形在各横坐标处的高度。$b$ 在波峰，$\theta_b=0$。$o$ 处在波谷，$\theta_o=\pi$。$a$ 处波形斜率为正，质点向下运动，$\theta_a=\pi/2$。$c$ 处波形斜率为负，质点向上运动，$\theta_c=3\pi/2$。于是

$$
\varphi_o=\frac{\pi}{2},\qquad \varphi_a=0,\qquad \varphi_b=-\frac{\pi}{2},\qquad \varphi_c=\pi
$$

也可用解法 2：把 $t=T/4$ 的波形沿 $-x$ 方向移回 $\lambda/4$（即退回 $T/4$ 内波传播的距离），得到 $t=0$ 的波形，直接读出各点初相，结果相同。

### 例 7.5 由波函数读波参量并求最大振动速度

例：一横波方程为 $y=0.6\cos\pi(40t-0.5x)\ \text{m}$。求：(1) 振幅、波长、频率、周期及波速；(2) 任一质点振动速度的幅值。

解 (1)：先写成标准形式

$$
y=0.6\cos2\pi\left(20t-\frac{x}{4}\right)
$$

与 $y=A\cos\left[2\pi\left(\dfrac{t}{T}-\dfrac{x}{\lambda}\right)+\varphi\right]$ 比较：

$$
A=0.6\ \text{m},\quad \lambda=4\ \text{m},\quad \nu=20\ \text{Hz},\quad T=\frac{1}{\nu}=0.05\ \text{s}
$$

$$
u=\lambda\nu=4\times20=80\ \text{m/s}
$$

解 (2)：对时间求偏导，

$$
v=\frac{\partial y}{\partial t}=-0.6\times40\pi\sin\pi(40t-0.5x)
$$

故

$$
v_{\max}=0.6\times40\pi=24\pi\approx75.4\ \text{m/s}
$$

要点：波速 $80\ \text{m/s}$ 与质点最大速度 $75\ \text{m/s}$ 是两个不同的量，数值接近纯属巧合。波速由媒质定，对同一列波处处相同；质点速度随相位按正弦变化。

### 例 7.6 由 $t=2\ \text{s}$ 波形求振动方程

例：一平面简谐波在 $t=2\ \text{s}$ 时的波形如图，振幅 $0.2\ \text{m}$，周期 $4\ \text{s}$，波沿 $+x$ 传播。求 $P$ 点的振动方程。

![t=2 s 的右行波波形，P 处曲线向上穿过横轴](/course-materials/campus-basic-physics/figures/07-08.png)

解（原题为单选，以下为补解）：$T=4\ \text{s}$，故 $\omega=2\pi/T=\pi/2$。$t=2\ \text{s}$ 时 $P$ 在平衡位置且波形上升，即

$$
y_P=0,\qquad \frac{\partial y}{\partial x}>0
$$

设 $y_P=A\cos(\omega t+\varphi_P)$，其相位

$$
\theta_P=\frac{\pi}{2}\times2+\varphi_P=\pi+\varphi_P
$$

平衡位置给出 $\cos\theta_P=0$，即 $\theta_P=\pm\pi/2$；"上升"对应 $\sin\theta_P>0$（沿 $+x$ 传播时，斜率与 $\sin\theta$ 同号），故取 $\theta_P=\pi/2$。于是

$$
\pi+\varphi_P=\frac{\pi}{2}\ \Rightarrow\ \varphi_P=-\frac{\pi}{2}
$$

$$
y_P=0.2\cos\left(\frac{\pi}{2}t-\frac{\pi}{2}\right)\ \text{m}
$$

要点：$t=2\ \text{s}$ 不是 $t=0$，求初相时必须先把已知时刻的相位算出来再倒推，直接把该时刻的相位当初相是典型错误。

## 7.3 物体的弹性形变

波是能量传播的一种形式，特点是：勿需质量迁移，能量却能向周围传播。要在媒质中传播机械波，媒质必须能发生弹性形变，所以先建立形变与应力的关系。

主要讨论弹性直杆的拉伸和压缩。在直杆两端加上与杆平行的拉力 $f$ 拉伸（或压力压缩）时，杆的长度 $l_0$ 会改变（拉伸时 $\Delta l>0$，压缩时 $\Delta l<0$）。这种应变用长度的相对增量

$$
\varepsilon=\frac{\Delta l}{l_0}
$$

来表征。在弹性限度内，应力与应变成正比，即

$$
T=\frac{f}{S}=E\varepsilon=E\frac{\Delta l}{l_0}
$$

其中 $S$ 为横截面积，系数 $E$ 称为**杨氏模量**。杨氏模量由材料本身决定，反映材料抵抗拉压形变的能力。

> 记号说明：课件在 §7.3、§7.4 中杨氏模量写作 $E$（个别页写作 $Y$），本文统一记作 $E$，与电场强度无关。剪切形变的相应模量记作 $G$（切变模量），体积形变的相应模量记作 $B$（体变模量），下一节会用到。

## 7.4 弹性介质中的波速

**相速** $u$ 由等相位点移动的速度定义。本章所用均匀、无色散的近似中，波速由介质参数和波的类型决定。

均匀各向同性固体中的体横波，以及细杆在长波近似下的纵波，分别满足

$$
\text{体横波：}\ u=\sqrt{\frac{G}{\rho}},\qquad
\text{细杆纵波：}\ u=\sqrt{\frac{E}{\rho}}
$$

液体中的纵波：

$$
u=\sqrt{\frac{B}{\rho}}
$$

其中 $\rho$ 为媒质的质量体密度，$G$ 为切变模量，$E$ 为杨氏模量，$B$ 为体变模量。

必须区分波速与质点振动速度：

- **波速（相速）**：振动形式即振动状态在媒质中的传播速度，完全由媒质性质决定；
- **振动速度**：质点位移的时间变化率，由质点的振动规律决定，$v=-\omega A\sin[\omega(t-x/u)+\varphi]$。

同一列波，波速处处相同，各质点振动速度却随相位不同而不同，最大值为 $\omega A$。两者数量级也可能相差很远（固体中声速约 $10^3\ \text{m/s}$，而质点振动速度通常很小）。

## 7.5 波的能量

### 7.5.1 体积元的动能与势能

波在媒质中传播时，各质点既振动又有形变，因此体积元 $\Delta V$ 内既有动能又有弹性势能。

取细杆中的纵向简谐行波为例，$y(x,t)$ 表示质点沿杆的纵向位移。

$$
y=A\cos\omega\left(t-\frac{x}{u}\right)
$$

则

$$
v=\frac{\partial y}{\partial t}=-A\omega\sin\omega\left(t-\frac{x}{u}\right),\qquad
\frac{\partial y}{\partial x}=\frac{A\omega}{u}\sin\omega\left(t-\frac{x}{u}\right)
$$

体积元内各质点的振动速度可视为相同，$\Delta m=\rho\Delta V$，其动能为

$$
\Delta E_k=\frac{1}{2}\Delta mv^2=\frac{1}{2}\rho\Delta VA^2\omega^2\sin^2\omega\left(t-\frac{x}{u}\right)
$$

势能来自体积元的形变。把体积元看成一截长为 $dx$、截面积为 $S$ 的弹性杆，由杨氏模量关系 $F=\dfrac{ES}{l}\Delta l$ 得等效劲度系数

$$
k=\frac{F}{dy}=\frac{SE}{dx}
$$

于是弹性势能

$$
\mathrm{d}W_p=\frac{1}{2}k(\mathrm{d}y)^2=\frac{1}{2}ES\,\mathrm{d}x\left(\frac{\partial y}{\partial x}\right)^2
$$

注意这里的 $\mathrm{d}y$ 是体积元两端的**位移差**（即这一小段杆的伸长量），等于 $\dfrac{\partial y}{\partial x}\mathrm{d}x$，不是质点位移 $y$ 本身。用 $S\,\mathrm{d}x=\mathrm{d}V$、$E=\rho u^2$ 代入：

$$
\mathrm{d}W_p=\frac{1}{2}\rho u^2\,\mathrm{d}V\left(\frac{\partial y}{\partial x}\right)^2
=\frac{1}{2}\rho\,\mathrm{d}V A^2\omega^2\sin^2\omega\left(t-\frac{x}{u}\right)
$$

与动能表达式完全相同。因此体积元的总能量

$$
\Delta E=\Delta E_k+\Delta E_p=2\Delta E_k=\rho\Delta VA^2\omega^2\sin^2\omega\left(t-\frac{x}{u}\right)
$$

### 7.5.2 动能与势能同相变化

这是波的能量与单个振子最不一样的地方。对弹簧振子，动能最大时势能为零，二者此消彼长；对媒质中的体积元，动能和势能**同时达到最大、同时为零**。

原因在于势能取决于形变 $\partial y/\partial x$ 而不是位移 $y$：

- 位移最大处（波峰、波谷），$\partial y/\partial x=0$，没有形变，势能为零；
- 位移为零处（平衡位置），$\partial y/\partial x$ 最大，形变最大，势能最大。

速度大小也在平衡位置达到最大，在波峰、波谷处为零，所以动能与势能同步涨落。能量密度的空间分布随这列行波一同传播，体积元的能量增减取决于两端的净能流。

### 7.5.3 能量密度、能流与波强

**能量密度**（单位体积的能量）：

$$
w=\frac{\Delta E}{\Delta V}=\rho A^2\omega^2\sin^2\omega\left(t-\frac{x}{u}\right)
$$

**平均能量密度**是一个周期内的平均值：

$$
\overline{w}=\frac{1}{T}\int_0^T w\,\mathrm{d}t=\frac{1}{2}\rho A^2\omega^2
$$

可见 $\overline{w}\propto A^2,\ \omega^2,\ \rho$。

**平均能流**：单位时间内通过垂直于波传播方向上某面积 $S$ 的平均能量。

$$
\overline{P}=\overline{w}uS=\frac{1}{2}uS\rho A^2\omega^2
$$

**能流密度（波的强度）**：单位时间内通过垂直于波传播方向上单位面积的平均能量。

$$
I=\frac{\overline{P}}{S}=\overline{w}u=\frac{1}{2}\rho A^2\omega^2u
$$

其矢量形式称为乌莫夫—玻印廷矢量（波强矢量）

$$
\vec{S}=\overline{w}\vec{u}
$$

单位为 $\mathrm{W/m^2}$。波的强度直接正比于振幅平方，这是后面讨论干涉强弱的依据。

### 7.5.4 平面波与球面波

在均匀、无吸收的介质中，稳态波沿同一束波线传播。通过这束波线所围的两个波面截面的平均功率相等。

对平面波，$S_1=S_2$，故 $A_1=A_2$，振幅不变。

对球面波，$S_1=4\pi r_1^2$、$S_2=4\pi r_2^2$，由 $\overline{P}_{S_1}=\overline{P}_{S_2}$ 得

$$
S_1A_1^2:S_2A_2^2=r_1^2A_1^2:r_2^2A_2^2=1
$$

$$
\frac{A_1}{A_2}=\frac{r_2}{r_1}\quad\Longrightarrow\quad A_r\propto\frac{1}{r}
$$

![](/course-materials/campus-basic-physics/figures/07-09.png)

即球面波的振幅随距离按 $1/r$ 递减，强度按 $1/r^2$ 递减。这也是"点波源发出的波在远处可视为平面波"的定量依据：$r$ 很大时，一小块波面上 $1/r$ 几乎不变。

### 7.5.5 简谐波能量的特点

1. 波动的动能和势能都是时间的周期函数，其周期为振动周期的一半（因为含 $\sin^2$）；
2. 体积元中的动能与势能变化同相位；
3. 体积元内波的总能量在 $0\sim\rho\Delta VA^2\omega^2$ 之间变化：$\Delta E$ 增大表示能量传入该体积元，减小表示能量传出；
4. 上述特征反映出波动能量沿波线传播。

## 7.6 惠更斯原理 波的反射与折射

### 7.6.1 惠更斯原理

> 媒质中波动传到的各点都可看作发射同频率子波的波源，在其后任一时刻，这些子波波面的包迹就是原波动在该时刻的波阵面。

![](/course-materials/campus-basic-physics/figures/07-10.png)

依据是：在连续弹性媒质中，任何一点的振动都将引起邻近各点的振动，所以媒质中任何一点都可以看作新的波源。

应用：求任一时刻的波面；解释波的反射、折射、衍射等现象。

![](/course-materials/campus-basic-physics/figures/07-11.png)

作图要点：把已知波面上各点当作子波源，以 $u\Delta t$ 为半径画子波（球面波画圆），所有子波的公切面就是新波面。平面波传播时波面保持平面，球面波传播时波面仍是同心球面。

### 7.6.2 衍射

**衍射（绕射）**：波在传播过程中遇到障碍物时能绕过障碍物的边缘改变传播方向的现象。

发生明显衍射的条件是障碍物尺寸 $a$ 与波长同量级：

$$
a\sim\lambda
$$

当 $a\gg\lambda$ 时，衍射效应可忽略，波近似沿直线传播。这就是"隔着墙能听到声音（声波波长大），却看不到人（光波波长极短）"的原因。

### 7.6.3 反射定律

1. 反射线、入射线和界面的法线在同一平面内；
2. 反射角等于入射角：$i=i'$。

用惠更斯原理证明：同一媒质中波速不变，$t$ 到 $t+\Delta t$ 内子波半径都等于 $u\Delta t$，两个直角三角形全等，故 $i=i'$。

### 7.6.4 折射定律

1. 折射线、入射线和界面的法线在同一平面内；
2. 入射角与折射角满足

$$
\frac{\sin i}{\sin r}=\frac{u_1}{u_2}
$$

![](/course-materials/campus-basic-physics/figures/07-12.png)

用惠更斯原理证明：设 $t$ 时刻波面与界面交于 $A$，波面另一端点 $B$ 在媒质 1 中。经过 $\Delta t$，$B$ 点的振动传到界面上的 $B_3$，走过

$$
\overline{BB_3}=u_1\Delta t
$$

同时 $A$ 点发出的子波在媒质 2 中传播了

$$
\overline{AA_3}=u_2\Delta t
$$

新波面为 $A_3B_3$。由几何关系，入射线与法线夹角 $i$ 与折射角 $r$ 分别满足 $\angle BAB_3=i$、$\angle A_3B_3A=r$，而两个直角三角形共用斜边 $\overline{AB_3}$，故

$$
\sin i=\frac{\overline{BB_3}}{\overline{AB_3}}=\frac{u_1\Delta t}{\overline{AB_3}},\qquad
\sin r=\frac{\overline{AA_3}}{\overline{AB_3}}=\frac{u_2\Delta t}{\overline{AB_3}}
$$

两式相除即得 $\sin i/\sin r=u_1/u_2$。

结合 $\lambda=u/\nu$ 且 $\nu$ 不变，得到等价形式

$$
\frac{\sin i}{\sin r}=\frac{u_1}{u_2}=\frac{\lambda_1}{\lambda_2}
$$

要点：折射时频率不变、波速改变、波长随之改变；"折射率" $n=c/u$ 的说法在光学中更常用，此处只需记住比值等于波速比。

## 7.7（一）波的叠加与干涉

### 7.7.1 波的叠加原理

两列或多列波在同一空间传播时，媒质中各质点将同时参与两个或多个振动。任一时刻质点的位移是每个波在该处所引起的振动位移的合成：

$$
y=y_1+y_2+\cdots
$$

叠加原理基于波的**独立传播特性**：同一空间传播的两列或多列波，在相遇处发生振动的叠加，相遇之后各自仍保持自身的特性（振动方向、频率、传播方向等）不变，就如同没有和其他波相遇一样。所以两列波相遇后再分开，各自照旧传播，不会"撞坏"对方。

### 7.7.2 波的干涉与相干条件

**波的干涉**：同频率、同振动方向且波源振动相位差恒定的两列波在空间相遇叠加时，使有些点的振动始终加强、有些点的振动始终减弱，即在空间形成稳定的强度分布。

能够产生干涉叠加的两列波称为**相干波**。相干条件为：

1. 频率相同；
2. 振动方向相同；
3. 相位差恒定。

水波干涉、油膜干涉的色彩、牛顿环，都是干涉现象。干涉和衍射都是波动的基本特性，可依此判断一种物理现象是否具有波动性。

### 7.7.3 干涉的定量分析

设两相干波源 $S_1$、$S_2$ 的振动方程

$$
y_{10}=A_1\cos(\omega t+\varphi_1),\qquad
y_{20}=A_2\cos(\omega t+\varphi_2)
$$

各自在 $P$ 点引起的振动（$P$ 到两源的距离为 $r_1$、$r_2$）：

$$
y_{1P}=A_1\cos\left(\omega t-\frac{2\pi r_1}{\lambda}+\varphi_1\right)
$$

$$
y_{2P}=A_2\cos\left(\omega t-\frac{2\pi r_2}{\lambda}+\varphi_2\right)
$$

![](/course-materials/campus-basic-physics/figures/07-13.png)

$P$ 点的合振动仍为同频率的简谐振动 $y_P=A\cos(\omega t+\varphi)$，合振幅由余弦定理给出：

$$
A=\sqrt{A_1^2+A_2^2+2A_1A_2\cos\Delta\varphi}
$$

其中两波在 $P$ 点的相位差

$$
\Delta\varphi=\left(\varphi_2-\frac{2\pi r_2}{\lambda}\right)-\left(\varphi_1-\frac{2\pi r_1}{\lambda}\right)
=\varphi_2-\varphi_1-\frac{2\pi}{\lambda}(r_2-r_1)
$$

对确定的点，$\Delta\varphi$ 是确定值，故 $A$ 是恒量；不同点 $r_2-r_1$ 不同，$A$ 可能不同。于是振幅在空间形成稳定分布：有些点 $A$ 始终最大，有些点始终最小。

### 7.7.4 加强、减弱条件与强度

1. 当

$$
\Delta\varphi=\varphi_2-\varphi_1-\frac{2\pi}{\lambda}(r_2-r_1)=\pm2k\pi\quad(k=0,1,2,\cdots)
$$

时，$A=A_1+A_2=A_{\max}$，干涉加强，对应振动最强点。

2. 当

$$
\Delta\varphi=\pm(2k+1)\pi\quad(k=0,1,2,\cdots)
$$

时，$A=|A_1-A_2|=A_{\min}$，干涉减弱；若 $A_1=A_2$，则 $A=0$，干涉相消。

3. 不满足上述两条件的点，振动介于最强与最弱之间：$|A_1-A_2|<A<A_1+A_2$。

4. 若两波源初相相同（$\varphi_1=\varphi_2$），则

$$
\Delta\varphi=\frac{2\pi}{\lambda}(r_1-r_2)=\frac{2\pi}{\lambda}\delta
$$

其中 $\delta=r_1-r_2$ 称为**波程差**。此时条件化为

$$
\delta=r_1-r_2=
\begin{cases}
\pm k\lambda, & \text{干涉加强}\\[4pt]
\pm(2k+1)\dfrac{\lambda}{2}, & \text{干涉减弱}
\end{cases}
\qquad(k=0,1,2,\cdots)
$$

**由振幅到强度。** 对同一介质内同向传播的同频平面波，平均能流密度与合振幅的平方成正比，因此

$$
I=I_1+I_2+2\sqrt{I_1I_2}\cos\Delta\varphi
$$

当 $A_1=A_2$（即 $I_1=I_2=I_0$）时

$$
I=2I_0(1+\cos\Delta\varphi)=4I_0\cos^2\frac{\Delta\varphi}{2}
$$

相长时合振幅为单列的两倍，得到 $I_{\max}=4I_0$，相消时 $I_{\min}=0$。对不同方向的波，合振幅仍可用于判断质点振动强弱，净能流要结合传播方向计算。

### 例 7.7 连线上两波叠加相消的位置

例：相距为 $5\lambda$ 的 $S_1$ 和 $S_2$ 为两相干波源，初相和振幅均相同，设两波传播时强度不随距离变化。求在其连线上两波叠加相消的位置。

解：先看连线外侧。$S_1$ 左侧或 $S_2$ 右侧各点，两波的波程差均为 $5\lambda$，是波长的整数倍，两波干涉加强，不存在相消点。

再看 $S_1$、$S_2$ 之间的点 $P$，设 $S_1P=x$，则 $S_2P=5\lambda-x$，波程差

$$
\delta=r_2-r_1=(5\lambda-x)-x=5\lambda-2x
$$

相消条件可统一写成 $\delta=(2k+1)\lambda/2$，其中 $k$ 取任意整数。解得

$$
5\lambda-2x=(2k+1)\frac{\lambda}{2}
\quad\Longrightarrow\quad
x=(9-2k)\frac{\lambda}{4}
$$

由 $0<x<5\lambda$ 得 $k=-5,-4,\cdots,4$，共 10 个相消点：

$$
x=\frac{\lambda}{4},\ \frac{3\lambda}{4},\ \frac{5\lambda}{4},\ \frac{7\lambda}{4},\ \frac{9\lambda}{4},\
\frac{11\lambda}{4},\ \frac{13\lambda}{4},\ \frac{15\lambda}{4},\ \frac{17\lambda}{4},\ \frac{19\lambda}{4}
$$

要点：先判断"外侧必加强"，再对中间段列波程差。相消点成对出现、关于中点对称，可用这一点检查答案个数与位置。

### 例 7.8 反相波源连线上的静止点

例：两相干波源 $A$、$B$ 相距 $20\ \text{m}$，振动频率为 $80\ \text{Hz}$，振动相位相反。两波均为平面波，在两者之间相向传播，波速为 $320\ \text{m/s}$。求 $A$、$B$ 连线上因干涉而静止的各点位置。

解：先求波长

$$
\lambda=\frac{u}{\nu}=\frac{320}{80}=4\ \text{m}
$$

设 $A$ 在 $x=0$、$B$ 在 $x=20\ \text{m}$，取 $A$ 的初相为零，则 $\varphi_A=0$、$\varphi_B=\pi$：

$$
y_A=A\cos\omega t,\qquad y_B=A\cos(\omega t+\pi)
$$

$A$ 的波沿 $+x$ 传播，$B$ 的波沿 $-x$ 传播，在 $P(x)$ 处

$$
y_1=A\cos\left[\omega\left(t-\frac{x}{u}\right)\right],\qquad
y_2=A\cos\left[\omega\left(t-\frac{20-x}{u}\right)+\pi\right]
$$

相位差

$$
\Delta\varphi=\left[\omega\left(t-\frac{20-x}{u}\right)+\pi\right]-\omega\left(t-\frac{x}{u}\right)
=\pi+\frac{\omega}{u}(2x-20)
$$

代入 $\omega=2\pi\nu=160\pi$、$u=320$，得 $\omega/u=\pi/2$：

$$
\Delta\varphi=\pi+\frac{\pi}{2}(2x-20)=\pi x-9\pi
$$

静止要求 $A=0$，即 $\Delta\varphi=(2k+1)\pi$：

$$
\pi x-9\pi=(2k+1)\pi\quad\Longrightarrow\quad x=2k+10
$$

由 $0\le x\le20$ 得 $k=0,\pm1,\cdots,\pm5$，故静止点为

$$
x=0,\ 2,\ 4,\ \cdots,\ 20\ \text{m}
$$

共 11 个点（含两端）。

两波源本身相差 $\pi$。波程差为整数个波长时，传播引起的相位差为 $2\pi$ 的整数倍，叠加后仍为反相，等幅时振幅为零。

### 例 7.9 相邻加强点定波长

例：$x$ 轴上的两相干波源 $S_1$、$S_2$ 间距为 $d$，两波源发出的波沿 $x$ 轴传播时强度保持不变。已知 $a$、$b$ 是相邻的干涉相长的两点，$x_a=8\ \text{m}$、$x_b=10\ \text{m}$、$d=20\ \text{m}$。求两波波长以及两波源间的最小相位差。

解：设两波源振动方程

$$
y_1=A\cos(\omega t+\varphi_1),\qquad y_2=A\cos(\omega t+\varphi_2)
$$

在 $x$ 处两波的相位差为

$$
\Delta\varphi=\left[\varphi_2-\frac{2\pi}{\lambda}(d-x)\right]-\left[\varphi_1-\frac{2\pi}{\lambda}x\right]
=(\varphi_2-\varphi_1)-\frac{2\pi d}{\lambda}+\frac{4\pi x}{\lambda}
$$

$a$、$b$ 都是相长点且相邻，故

$$
\Delta\varphi_a=2k\pi,\qquad \Delta\varphi_b=2(k+1)\pi
$$

两式相减：

$$
\Delta\varphi_b-\Delta\varphi_a=\frac{4\pi}{\lambda}(x_b-x_a)=2\pi
\quad\Longrightarrow\quad
\lambda=2(x_b-x_a)=2\times2=4\ \text{m}
$$

把 $\lambda=4\ \text{m}$、$x_a=8\ \text{m}$、$d=20\ \text{m}$ 代回 $\Delta\varphi_a=2k\pi$：

$$
(\varphi_2-\varphi_1)-\frac{2\pi\times20}{4}+\frac{4\pi\times8}{4}=2k\pi
$$

$$
\varphi_2-\varphi_1=2k\pi+2\pi=(2k+2)\pi
$$

取 $k=-1$ 得最小相位差

$$
\varphi_2-\varphi_1=0
$$

要点：相邻两个加强点的相位差相差 $2\pi$，而相位差随位置的变化率是 $4\pi/\lambda$（因为两波相向传播，一个 $x$ 的增量使一路增加、另一路减少），所以相邻加强点间距是 $\lambda/2$。这个结论可直接用来快速定波长。

## 7.7（二）驻波

### 7.7.5 驻波的形成

驻波是一种特殊的干涉现象：两列**振幅相同**的相干波在同一直线上沿**相反方向**传播时相遇叠加所产生。

![](/course-materials/campus-basic-physics/figures/07-14.png)

形成的图景是：某些点始终不动（波节），某些点振幅始终最大（波腹），波形不再向前传播，只是各点在自己的平衡位置附近振动。相邻波节间距为 $\lambda/2$，波节到相邻波腹的距离为 $\lambda/4$。

### 7.7.6 驻波方程

设两列波

$$
y_1=A\cos2\pi\left(\nu t-\frac{x}{\lambda}\right),\qquad
y_2=A\cos2\pi\left(\nu t+\frac{x}{\lambda}\right)
$$

叠加：

$$
y=y_1+y_2=A\cos2\pi\left(\nu t-\frac{x}{\lambda}\right)+A\cos2\pi\left(\nu t+\frac{x}{\lambda}\right)
$$

用和差化积得驻波方程

$$
y=\left(2A\cos\frac{2\pi x}{\lambda}\right)\cos2\pi\nu t
$$

### 7.7.7 驻波的特征

**1. 各处质点振幅不同。** 振幅随位置变化：

$$
A_x=\left|2A\cos\frac{2\pi x}{\lambda}\right|,\qquad 0\le A_x\le2A
$$

**2. 以波节为界，分段作同相振动。** 两波节之间各质点同相；同一波节两侧质点反相。也就是说，驻波中各点的相位只有 $0$ 和 $\pi$ 两种，不像行波那样连续变化。

**3. 波腹与波节的位置。**

波腹：$\left|\cos\dfrac{2\pi x}{\lambda}\right|=1$，即 $\dfrac{2\pi x}{\lambda}=\pm k\pi$，

$$
x_{\text{腹}}=\pm k\frac{\lambda}{2}\qquad(k=0,1,2,3,\cdots)
$$

波节：$\cos\dfrac{2\pi x}{\lambda}=0$，即 $\dfrac{2\pi x}{\lambda}=\pm(2k+1)\dfrac{\pi}{2}$，

$$
x_{\text{节}}=\pm(2k+1)\frac{\lambda}{4}\qquad(k=0,1,2,3,\cdots)
$$

**4. 波腹、波节间的距离。**

相邻两波腹：

$$
\Delta x_{\text{腹}}=(k+1)\frac{\lambda}{2}-k\frac{\lambda}{2}=\frac{\lambda}{2}
$$

相邻两波节：

$$
\Delta x_{\text{节}}=(2k+3)\frac{\lambda}{4}-(2k+1)\frac{\lambda}{4}=\frac{\lambda}{2}
$$

相邻的波节与腹点：

$$
|x_{\text{腹}}-x_{\text{节}}|=\frac{\lambda}{4}
$$

**5. 理想驻波的周期平均能流为零。** 两列等幅行波沿相反方向输运能量，平均起来没有净输运。相邻波节之间仍可有瞬时能量交换。

### 7.7.8 反射波的相位变化与半波损失

交界处的反射相位取决于波型、入射条件和阻抗。以下讨论一维正入射的位移波。对平面声波，声阻抗大小为 $\rho u$。对等张力相接的两段弦，可比较线密度与横波波速的乘积。以下把高阻抗称为波密、低阻抗称为波疏。

有限阻抗差通常同时产生反射和透射，反射波振幅一般小于入射波。以下等幅写法用于说明理想全反射时的自由端和固定端。

**1. 波密媒质中的波在波疏媒质界面上反射**（$\rho_1u_1>\rho_2u_2$）：在反射点，反射波与入射波同相位，

$$
y_{\text{入}}=A\cos(\omega t+\varphi),\qquad
y_{\text{反}}=A\cos(\omega t+\varphi)
$$

位移反射同相。理想自由端全反射时，两波等幅，端点为波腹。

![](/course-materials/campus-basic-physics/figures/07-15.png)

**2. 波疏媒质中的波在波密媒质界面上反射**（$\rho_1u_1<\rho_2u_2$）：在反射点，反射波与入射波反相，

$$
y_{\text{入}}=A\cos(\omega t+\varphi),\qquad
y_{\text{反}}=A\cos(\omega t+\varphi\pm\pi)
$$

相位突变 $\pi$ 等效于多半个波长的相位滞后，称为半波损失。理想固定端全反射时，两波等幅反相，端点为波节。

总结成一句：

| 反射方向 | 位移相位 | 理想全反射时的反射点 | 对应端点 |
|---|---|---|---|
| 波疏 $\to$ 波密（$\rho_1u_1<\rho_2u_2$） | 反相，半波损失 | 波节 | 固定端 |
| 波密 $\to$ 波疏（$\rho_1u_1>\rho_2u_2$） | 同相，无半波损失 | 波腹 | 自由端 |

求端点时先看题设是否为固定端、自由端或一般阻抗界面。固定端要求总位移为零，自由端要求横向力为零。两类理想端点各自给出波节和波腹。

### 例 7.10 经反射后在某点相消

例：相干波源 $S_1$ 和 $S_2$ 发出的两列相干波经图示的传播过程而在 $P$ 点相遇。已知两波振幅相等，且 $M$ 点的反射存在半波损失，$\overline{S_1M}+\overline{MP}=7\lambda$、$\overline{S_2P}=2\lambda$。设两波源的振动方程分别为 $y_{10}=A\cos\pi t$、$y_{20}=A\cos\pi t$。求：(1) 两列波分别在 $P$ 点的振动方程；(2) $P$ 点的合振动。

![](/course-materials/campus-basic-physics/figures/07-16.png)

解 (1)：$S_1$ 的波先传到 $M$，在 $M$ 反射（有半波损失），再传到 $P$。$S_1$ 波在 $M$ 点入射时的振动为

$$
y_1=A\cos\left(\pi t-\frac{2\pi}{\lambda}\overline{S_1M}\right)
$$

反射波在 $M$ 点反相：

$$
y_{1\text{反}}=A\cos\left(\pi t-\frac{2\pi}{\lambda}\overline{S_1M}-\pi\right)
$$

再传到 $P$，相位再落后 $2\pi\overline{MP}/\lambda$：

$$
y_{1P}=A\cos\left(\pi t-\frac{2\pi}{\lambda}\overline{S_1M}-\frac{2\pi}{\lambda}\overline{MP}-\pi\right)
$$

代入 $\overline{S_1M}+\overline{MP}=7\lambda$：

$$
y_{1P}=A\cos(\pi t-14\pi-\pi)=A\cos(\pi t-15\pi)=-A\cos\pi t
$$

$S_2$ 的波直接传到 $P$：

$$
y_{2P}=A\cos\left(\pi t-\frac{2\pi}{\lambda}\overline{S_2P}\right)
=A\cos(\pi t-4\pi)=A\cos\pi t
$$

解 (2)：两波在 $P$ 点等幅反相，合振动

$$
y=y_{1P}+y_{2P}=0
$$

即 $P$ 点的振动相消，始终静止。

要点：反射题只需沿路径逐段"扣相位"，每一段路程扣 $2\pi L/\lambda$，遇到半波损失再扣 $\pi$。不要试图先判断哪条路"多走半个波长"，路径关系一复杂就容易乱。

### 例 7.11 反射面平行于传播轴时的加强点

例：反射面 $M$ 与 $ox$ 轴平行，由波源 $o$ 发出的波中，经反射面反射的波与直接沿 $x$ 轴传播的波在 $x$ 轴上相遇。设反射存在半波损失，求 $ox$ 轴上因干涉而加强的点。

![从 o 发出的直达波和经平面 M 反射到 P 的路径](/course-materials/campus-basic-physics/figures/07-17.png)

解：设波源 $o$ 到反射面的垂直距离为 $h$，$x$ 轴上的 $P$ 点坐标为 $x$。由镜像对称，反射路径长等于镜像点 $o'$ 到 $P$ 的直线距离。$o'$ 是 $o$ 关于 $M$ 的镜像，在 $o$ 正上方、离 $x$ 轴 $2h$ 处，故

$$
\overline{oM}+\overline{MP}=\overline{o'P}=\sqrt{x^2+4h^2}=2\sqrt{\left(\frac{x}{2}\right)^2+h^2}
$$

直接传播的路程为 $oP=x$。反射存在半波损失，反射波多出 $\lambda/2$ 的等效路程，因此要相长，几何路程差须为半波长的奇数倍：

$$
2\sqrt{\left(\frac{x}{2}\right)^2+h^2}-x=\left(k+\frac{1}{2}\right)\lambda
$$

令 $a=(k+1/2)\lambda$，两边平方：

$$
2\sqrt{\left(\frac{x}{2}\right)^2+h^2}=x+a
$$

$$
4\left(\frac{x^2}{4}+h^2\right)=x^2+2ax+a^2
$$

$x^2$ 消去，解得

$$
x=\frac{4h^2-a^2}{2a}=\frac{4h^2-\left(k+\frac{1}{2}\right)^2\lambda^2}{2\left(k+\frac{1}{2}\right)\lambda}
$$

要求 $x>0$，即

$$
k\in\{0,1,2,\ldots\},\qquad k<\frac{2h}{\lambda}-\frac{1}{2}
$$

几何路程差随 $x>0$ 从 $2h$ 单调趋近零，因而所有满足 $0<(k+\tfrac12)\lambda<2h$ 的级次都可出现。原解从 $k=1$ 起列，若 $h>\lambda/4$，$k=0$ 对应的路程差 $\lambda/2$ 也能产生加强点。

## 7.11 多普勒效应

### 7.11.1 现象与约定

因波源或观察者相对于媒质运动，而使观察者接收到的波的频率与波源振动频率不同的现象，称为**多普勒效应**。

约定：

- $u$：波速（相对媒质）；
- $T$、$\nu$：波的周期和频率（即波源振动频率）；
- $\nu'$：观察者接收到的频率；
- $V_S$：波源相对媒质的运动速率；
- $V_O$：观察者相对媒质的运动速率。

**关键前提：** 波源每秒发出的波的数目 $\nu$ 不变；波相对于媒质的速度 $u$ 不变。变的只是观察者在单位时间内"数到"多少个波——要么它迎着波多跑了一段，要么波长被压缩了。

### 7.11.2 波源与观察者都静止

$$
\nu'=\frac{u}{\lambda}=\frac{u}{uT}=\nu
$$

接收频率等于波源振动频率。

### 7.11.3 波源不动，观察者以 $V_O$ 运动

**a. 观察者朝着波源运动。** 波相对观察者的传播速度变为

$$
u'=u+V_O
$$

波长不变，故

$$
\nu'=\frac{u'}{\lambda}=\frac{u+V_O}{\lambda}=\frac{u+V_O}{uT}=\frac{u+V_O}{u}\nu
$$

接收到的频率高于波源振动频率，$\nu'>\nu$。

**b. 观察者背离波源运动。** 同理

$$
u'=u-V_O,\qquad
\nu'=\frac{u-V_O}{u}\nu<\nu
$$

要点：观察者运动改变的是"波相对观察者的速度"，波长不受影响。形象地说，观察者在单位时间内扫过更多的波（或更少）。

### 7.11.4 观察者静止，波源以 $V_S$ 运动

**a. 波源朝着观察者运动。** 波源每发出一个波就前移 $V_ST$，使前方波长被压缩：

$$
\lambda'=\lambda-V_ST=(u-V_S)T
$$

波速仍为 $u$，故

$$
\nu'=\frac{u}{\lambda'}=\frac{u}{(u-V_S)T}=\frac{u}{u-V_S}\nu>\nu
$$

![](/course-materials/campus-basic-physics/figures/07-18.png)

**b. 波源背离观察者运动。** 波长被拉长：

$$
\lambda'=uT+V_ST=(u+V_S)T
$$

$$
\nu'=\frac{u}{u+V_S}\nu<\nu
$$

要点：波源运动改变的是"波长"，波速不变。这是与观察者运动最本质的区别，也是符号容易搞反的地方：观察者动改分子，波源动改分母。

### 7.11.5 两者同时运动与统一公式

波源与观察者相向运动时，同时有 $u'=u+V_O$、$\lambda'=(u-V_S)T$：

$$
\nu'=\frac{u'}{\lambda'}=\frac{u+V_O}{(u-V_S)T}=\frac{u+V_O}{u-V_S}\nu>\nu
$$

背向运动时：

$$
\nu'=\frac{u-V_O}{u+V_S}\nu<\nu
$$

统一写法中，取波的传播方向为正，$v_S$、$v_O$ 分别为波源和观察者速度在该方向上的带符号分量，均相对媒质测量。

$$
\nu'=\frac{u-v_O}{u-v_S}\nu
$$

波源沿传播方向移动会缩短波长，观察者沿传播方向移动会降低扫过波面的速率，两项可独立判断。比如两者相对媒质同向同速时，分子与分母相等，接收频率不变。以上按波源与观察者沿同一直线作亚声速运动讨论。

$$
V_S<u,\qquad V_O<u
$$

斜向运动时，应沿实际到达观察者的波线取速度分量，也就是由波源发射位置指向观察者接收位置的方向。

### 7.11.6 电磁波的多普勒效应

电磁波不需要媒质，其多普勒效应需用相对论推导：

$$
\nu'=\sqrt{\frac{1\pm V/c}{1\mp V/c}}\ \nu
$$

这是光源与观察者沿视线运动时的真空公式，$c$ 为光速，$V$ 为两者的相对速率。接近时分子取加号，远离时分子取减号。电磁波还存在横向多普勒效应。

**红移**：当光源远离接收器时，接收频率变小、波长变长，同种元素光谱的谱线向红端移动。星系光谱红移是宇宙膨胀的重要证据。

### 7.11.7 应用

- 利用电磁波的多普勒效应可方便地跟踪人造地球卫星：地面站确定远在 $10^8\ \text{m}$ 处的卫星位置变化时，可精确到 $10^2\sim10^3\ \text{m}$；多普勒卫星导航定位系统是相反方向的应用。
- 利用声波的多普勒效应测定流体流速、振动物体的振动、潜艇速度，用于报警和监测车速。
- 医学上利用超声波的多普勒效应诊断心脏跳动情况，如超声心动图、多普勒血流仪。

### 7.11.8 冲击波（激波）

前述公式只适用于波源速度小于波速（$V_S<u$）的情况。

当 $V_S=u$ 时，连续发出的波阵面在传播方向前端相切。此时简单的线性叠加模型预示波前聚集，真实激波的压力分布还取决于非线性流动。

![](/course-materials/campus-basic-physics/figures/07-19.png)

当 $V_S>u$ 时，波源总在波阵面前面，各时刻的波阵面在波源后方相互叠加，形成一个以波源为顶点的圆锥面，称为**马赫锥**，锥面半顶角 $\alpha$ 满足

$$
\sin\alpha=\frac{u}{V_S}
$$

**马赫数**定义为

$$
n=\frac{V_S}{u}=\frac{1}{\sin\alpha}
$$

超声速飞行会沿航迹形成激波。锥形激波扫过地面上的观察者时，可听到声爆。

## 本章小结

**主线**：波的形成（波源 + 弹性媒质）→ 用波长、频率、波速描述 → 波函数 $y=A\cos[\omega(t-x/u)+\varphi]$ → 相位随传播落后 → 波速由媒质定、能量随波传 → 惠更斯原理统一解释反射折射衍射 → 叠加与干涉（同频相干）→ 驻波（反向等幅）→ 多普勒效应（相对媒质运动）。

必须记住的几条：

1. 波传播的是相位和能量，不是物质。$\nu$ 由波源定、过界面不变；$u$ 由媒质定；$\lambda=u/\nu$ 随之变。
2. 波函数符号只看"沿传播方向相位落后"：$+x$ 用 $t-x/u$，$-x$ 用 $t+x/u$。某点初相 $\varphi_P=\varphi-\omega x/u$。
3. 相位差与波程差：$\Delta\varphi=\dfrac{2\pi}{\lambda}\Delta x$。波程差一个 $\lambda$，相位差 $2\pi$。
4. 波速 $u$ 与质点振动速度 $v=-\omega A\sin[\omega(t-x/u)+\varphi]$ 是两回事，$u$ 处处相同，$v$ 随相位变。
5. 波的能量：动能与势能同相变化（同在平衡位置最大），总能量周期为振动周期的一半。$\overline{w}=\frac12\rho A^2\omega^2$，$I=\frac12\rho A^2\omega^2u$。
6. 干涉的实质是相位差：$\Delta\varphi=\varphi_2-\varphi_1-\frac{2\pi}{\lambda}(r_2-r_1)$。加强取 $2k\pi$，减弱取 $(2k+1)\pi$；同相波源时化为一句话——波程差是 $\lambda$ 的整数倍加强、半波长的奇数倍减弱。
7. 同向、等幅的相干平面波按合振幅平方计算平均能流密度，最大值为单列的 4 倍。
8. 等幅反向相干波叠加成理想驻波，相邻波节间距为 $\lambda/2$，相邻节腹间距为 $\lambda/4$，周期平均能流为零。
9. 理想固定端的位移反射反相，端点为波节。理想自由端的位移反射同相，端点为波腹。一般阻抗界面还需考虑透射。
10. 机械波多普勒公式 $\nu'=(u-v_O)\nu/(u-v_S)$ 的两个速度都是相对媒质、沿传播方向为正的分量。

**易错点**：

- 把波函数中的 $x/u$ 符号写反：先确定传播方向，再问"右方点落后还是超前"；
- 求某点初相时，把"某时刻的相位"直接当成初相（如例 7.6 的 $t=2\ \text{s}$）；
- 把固定界面上的频率连续条件和无色散模型的恒定波速混用；
- 认为波的动能、势能此消彼长（那是单个振子，波中二者同相）；
- 干涉加强处把强度算成 $2I_0$；
- 驻波中把"波节两侧反相"误记为"波节两侧同相"，或把节腹间距记成 $\lambda/2$；
- 反射题不先判断波密/波疏就套用半波损失；
- 多普勒公式中把 $V_S$、$V_O$ 当成二者相对速度，或忘记 $V_S<u$ 的前提。

## 原始资料

现有课件从 7.7 节跳到 7.11 节，7.8–7.10 暂缺。例 7.2 和例 7.6 对应原单选题的 A、C。

- 第7章1&2节 行波 简谐波.pdf（17 页，§7.1–§7.2 主干）
- 第7章1&2节 行波 简谐波(2).pdf（9 页，例题与习题补充，第 1 页与主干第 17 页重复）
- 第7章3-6节 弹性形变 波速 波的能量 惠更斯原理 波的反射与折射.pdf（16 页，§7.3–§7.6）
- 第7章7节1 波的叠加.pdf（14 页，叠加与干涉）
- 第7章7节2 驻波.pdf（8 页，驻波与半波损失）
- 第7章7节2 驻波(2).pdf（3 页，页脚标 1/4–3/4，缺第 4 页）
- 第7章11节 多普勒效应.pdf（12 页，§7.11）
