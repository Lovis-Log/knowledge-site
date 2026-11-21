---
slug: "homework-07"
title: "第 7 次作业（机械波）"
summary: "机械波的原题与解析。"
updatedAt: "2026-11-19"
content_type: "reference"
group: "homework"
displayNumber: "07"
tags: ["基础物理"]
sources: [{"kind": "article", "title": "7 机械波习题 (1).pdf", "url": "https://drive.google.com/file/d/1Sr3lzqDxV8wDxsdnsvgJqggmIlG0XnUK/view?usp=drivesdk"}]
---

## 一、选择题

### 题目 1 · 选择题 1

<!-- homework-topic: 由波函数判断周期、频率、波长与波速 -->

已知一平面简谐波的表达式为 $y=A\cos(at-bx)$（$a$、$b$ 为正值常量），则［ ］

（A）波的频率为 $a$；（B）波的传播速度为 $b/a$；

（C）波长为 $\pi/b$；（D）波的周期为 $2\pi/a$。

答案：D

【补充解答】与标准形式 $y=A\cos\left[2\pi\left(\dfrac{t}{T}-\dfrac{x}{\lambda}\right)\right]=A\cos(\omega t-kx)$ 逐项对照：$\omega=a$，$k=b$，于是

$$
T=\frac{2\pi}{\omega}=\frac{2\pi}{a},\qquad \nu=\frac{a}{2\pi},\qquad \lambda=\frac{2\pi}{b},\qquad u=\frac{\omega}{k}=\frac{a}{b}
$$

可见频率是 $\dfrac{a}{2\pi}$ 而非 $a$，波速是 $\dfrac{a}{b}$ 而非 $\dfrac{b}{a}$，波长是 $\dfrac{2\pi}{b}$ 而非 $\dfrac{\pi}{b}$，只有周期 $2\pi/a$ 正确，选 D。

### 题目 2 · 选择题 2

<!-- homework-topic: 由 $P$ 点振动方程判断各点振动方程与波函数 -->

如图，一平面简谐波以波速 $u$ 沿 $x$ 轴正方向传播，$O$ 为坐标原点。已知 $P$ 点的振动方程为 $y=A\cos\omega t$，则［ ］

![O、P、C 三点与波速 u 方向](/course-materials/campus-basic-physics/figures/37-01.png)

（A）$O$ 点的振动方程为 $y=A\cos[\omega(t-l/u)]$；

（B）波的表达式为 $y=A\cos\{\omega[t-(l/u)-(x/u)]\}$；

（C）波的表达式为 $y=A\cos\{\omega[t+(l/u)-(x/u)]\}$；

（D）$C$ 点的振动方程为 $y=A\cos[\omega(t-3l/u)]$。

答案：C

【补充解答】波沿 $+x$ 传播，波形表达式应为 $y=A\cos\left[\omega\left(t-\dfrac{x}{u}\right)+\varphi_0\right]$，即坐标越大相位越落后。设 $P$ 在 $x=l$ 处（图中 $P$ 距 $O$ 为 $l$），由 $y_P=A\cos\omega t$ 得

$$
\omega\left(t-\frac{l}{u}\right)+\varphi_0=\omega t\ \Longrightarrow\ \varphi_0=\frac{\omega l}{u}
$$

故波函数

$$
\begin{aligned}
y&=A\cos\left\{\omega\left[t-\frac{x}{u}\right]+\frac{\omega l}{u}\right\}\\
&=A\cos\left\{\omega\left[t+\frac{l}{u}-\frac{x}{u}\right]\right\}
\end{aligned}
$$

即 C 正确。核对其他选项：$O$ 点（$x=0$）比 $P$ 早振动 $l/u$，应为 $y=A\cos[\omega(t+l/u)]$，A 错；B 在 $x=l$ 处给出 $A\cos[\omega(t-2l/u)]\neq A\cos\omega t$，错；$C$ 点在 $x=2l$，$y=A\cos[\omega(t+l/u-2l/u)]=A\cos[\omega(t-l/u)]$，D 错。

### 题目 3 · 选择题 3

<!-- homework-topic: 由 $t=t'$ 时刻波形曲线求原点的振动方程 -->

一平面简谐波以速度 $u$ 沿 $x$ 轴正方向传播，在 $t=t'$ 时波形曲线如图所示。则坐标原点 $O$ 的振动方程为［ ］

![t=t' 时刻波形，b 标出半个波长](/course-materials/campus-basic-physics/figures/37-02.png)

（A）$y=a\cos\left[\dfrac{u}{b}(t-t')+\dfrac{\pi}{2}\right]$；

（B）$y=a\cos\left[2\pi\dfrac{u}{b}(t-t')-\dfrac{\pi}{2}\right]$；

（C）$y=a\cos\left[\pi\dfrac{u}{b}(t+t')+\dfrac{\pi}{2}\right]$；

（D）$y=a\cos\left[\pi\dfrac{u}{b}(t-t')-\dfrac{\pi}{2}\right]$。

答案：D

【补充解答】第一步定波长：图中曲线从 $O$ 出发向下，到 $x=b$ 处再次过零且转为向上，$O$ 与 $x=b$ 是相邻的两个零点，故 $b=\dfrac{\lambda}{2}$，即 $\lambda=2b$，于是

$$
k=\frac{2\pi}{\lambda}=\frac{\pi}{b},\qquad \omega=ku=\frac{\pi u}{b}
$$

角频率 $\omega=ku=\dfrac{2\pi}{2b}u=\dfrac{\pi u}{b}$。选项（A）的系数是 $\dfrac{u}{b}$，只有正确角频率的 $1/\pi$，可先排除；C 用 $(t+t')$ 表示波向 $-x$ 传播，与题意矛盾。

第二步定相位：$t=t'$ 时 $O$ 处位移为零且波形随 $x$ 增大而下降，沿 $+x$ 传播时质元速度 $v_y=-u\dfrac{\partial y}{\partial x}>0$，即 $O$ 在 $t'$ 时刻正向上运动。设 $y_O=a\cos[\omega(t-t')+\varphi_0]$，由 $y_O(t')=0$、$v_y>0$ 得

$$
\cos\varphi_0=0,\qquad -a\omega\sin\varphi_0>0\ \Longrightarrow\ \varphi_0=-\frac{\pi}{2}
$$

故

$$
y_O=a\cos\left[\frac{\pi u}{b}(t-t')-\frac{\pi}{2}\right]
$$

选 D。

### 题目 4 · 选择题 4

<!-- homework-topic: 行波中质元动能与弹性势能的关系 -->

当一平面简谐机械波在弹性媒质中传播时，下述各结论哪个是正确的？［ ］

（A）媒质质元的振动动能增大时，其弹性势能减小，总机械能守恒；

（B）媒质质元的振动动能和弹性势能都作周期性变化，但二者的相位不相同；

（C）媒质质元的振动动能和弹性势能的相位在任一时刻都相同，但二者的数值不等；

（D）媒质质元在其平衡位置处弹性势能最大。

答案：D

【补充解答】在行波中，质元的形变由 $\dfrac{\partial y}{\partial x}$ 描述，而 $\dfrac{\partial y}{\partial x}$ 与质点速度 $v_y=\dfrac{\partial y}{\partial t}$ 同相变化，因此动能密度与势能密度不仅同相，而且数值相等（这一点与孤立振子“动能最大时势能为零”完全不同，是行波的特征）。故 A、B、C 均错。质元在平衡位置处速度最大、形变也最大，弹性势能取最大值，D 正确。

## 二、填空题

### 题目 5 · 填空题 1

<!-- homework-topic: 由波函数求给定点的振动方程与两点相位差 -->

已知一平面简谐波的表达式为 $y=0.25\cos(125t-0.37x)$（SI），则

$x_1=10\ \text{m}$ 点处质点的振动方程为 ______；

$x_1=10\ \text{m}$ 和 $x_2=25\ \text{m}$ 两点间的振动相位差为 ______。

答案：$y=0.25\cos(125t-3.7)$（SI）；$5.55\ \text{rad}$

【补充解答】把 $x=10$ 代入即得该点振动方程

$$
y=0.25\cos(125t-3.7)\quad(\text{SI})
$$

同一时刻两点的相位差只由 $kx$ 之差决定：

$$
\Delta\varphi=k(x_2-x_1)=0.37\times(25-10)=5.55\ \text{rad}
$$

因波沿 $+x$ 传播，$x_2$ 处相位比 $x_1$ 处落后 $5.55\ \text{rad}$。若取带符号差 $\varphi_2-\varphi_1$，结果为 $-5.55\ \text{rad}$。

### 题目 6 · 填空题 2

<!-- homework-topic: 波沿 $-x$ 传播时求 $O$ 点振动方程与波动表达式 -->

如图所示，一平面简谐波沿 $Ox$ 轴负向传播，波速大小为 $u$，若 $P$ 处质点的振动方程为 $y_P=A\cos(\omega t+\varphi)$，则

$O$ 处质点的振动方程 ______；

该波的波动表达式 ______。

![P 在 O 左侧，相距 L，波沿 −x 传播](/course-materials/campus-basic-physics/figures/37-03.png)

答案：$y_O=A\cos\left[\omega\left(t+\dfrac{L}{u}\right)+\varphi\right]$；$y=A\cos\left[\omega\left(t+\dfrac{x}{u}\right)+\varphi+\dfrac{\omega L}{u}\right]$（SI）

【补充解答】波沿 $-x$ 传播，波函数取 $y=A\cos[\omega(t+x/u)+\varphi_0]$，相位随 $x$ 增大而超前。$P$ 在 $x=-L$ 处：

$$
\begin{aligned}
A\cos\left[\omega\left(t-\frac{L}{u}\right)+\varphi_0\right]
&=A\cos(\omega t+\varphi)\\
\Longrightarrow\quad \varphi_0&=\varphi+\frac{\omega L}{u}
\end{aligned}
$$

于是

$$
y=A\cos\left[\omega\left(t+\frac{x}{u}\right)+\varphi+\frac{\omega L}{u}\right]
$$

$O$ 点（$x=0$）比 $P$ 早接收到振动，相位超前 $kL=\dfrac{\omega L}{u}$：

$$
y_O=A\cos\left[\omega\left(t+\frac{L}{u}\right)+\varphi\right]
$$

### 题目 7 · 填空题 3

<!-- homework-topic: 由 $t=0$ 波形求波动表达式与 $P$ 点振动方程 -->

图示为一平面简谐波在 $t=0$ 时刻的波形图，则该波的波动表达式 ______；$P$ 处质点的振动方程为 ______。

![t=0 波形，u=0.08 m/s，P 在 x=0.20 m 处](/course-materials/campus-basic-physics/figures/37-04.png)

答案：$y=0.04\cos(0.4\pi t-5\pi x-\pi/2)$（SI）；$y_P=0.04\cos(0.4\pi t+\pi/2)$（SI）

【补充解答】由图读出 $A=0.04\ \text{m}$；$x=0.10\ \text{m}$ 处为波谷、$x=0.30\ \text{m}$ 处为波峰，相邻峰谷相距 $\lambda/2=0.20\ \text{m}$，故 $\lambda=0.40\ \text{m}$，$k=\dfrac{2\pi}{\lambda}=5\pi\ \text{m}^{-1}$，$\omega=ku=5\pi\times0.08=0.4\pi\ \text{rad/s}$。

$t=0$ 时曲线从 $O$ 出发向下，即 $y(0,0)=0$、$\left.\dfrac{\partial y}{\partial x}\right|_{x=0}<0$。设 $y=A\cos(\omega t-kx+\varphi_0)$，则 $t=0$ 时 $y=A\cos(\varphi_0-kx)$，由 $x=0$ 处 $y=0$ 得 $\varphi_0=\pm\dfrac{\pi}{2}$；由斜率

$$
\left.\frac{\partial y}{\partial x}\right|_{x=0}=kA\sin\varphi_0<0\ \Longrightarrow\ \varphi_0=-\frac{\pi}{2}
$$

故

$$
y=0.04\cos(0.4\pi t-5\pi x-\pi/2)\quad(\text{SI})
$$

$P$ 在 $x=0.20\ \text{m}$ 处，代入得 $5\pi\times0.20=\pi$：

$$
y_P=0.04\cos(0.4\pi t-\pi-\pi/2)=0.04\cos(0.4\pi t-3\pi/2)=0.04\cos(0.4\pi t+\pi/2)
$$

即 $y_P=-0.04\sin(0.4\pi t)$，$t=0$ 时 $P$ 处质元正在平衡位置向下运动。这与图中 $P$ 点处波形随 $x$ 增大而上升相符：沿 $+x$ 传播时质元速度 $v_y=-u\dfrac{\partial y}{\partial x}$，波形上升处（$\partial y/\partial x>0$）质元向下。

### 题目 8 · 填空题 4

<!-- homework-topic: 平面简谐波的能量密度与通过截面的总能量 -->

一平面简谐波，频率为 $1.0\times10^{3}\ \text{Hz}$，波速为 $1.0\times10^{3}\ \text{m/s}$，振幅为 $1.0\times10^{-4}\ \text{m}$，在截面积为 $4.0\times10^{-4}\ \text{m}^2$ 的管内介质中传播，若介质的密度为 $8.0\times10^{2}\ \text{kg}\cdot\text{m}^{-3}$，则该波的能量密度 ______；该波在 $60\ \text{s}$ 内垂直通过截面的总能量为 ______。

答案：平均能量密度 $1.6\times10^{2}\ \text{J/m}^3$（最大值 $3.2\times10^{2}\ \text{J/m}^3$）；$3.8\times10^{3}\ \text{J}$

【补充解答】角频率

$$
\omega=2\pi\nu=2\pi\times1.0\times10^{3}=6.28\times10^{3}\ \text{rad/s}
$$

能量密度瞬时值为 $w=\rho A^2\omega^2\sin^2(\omega t-kx)$，其最大值与平均值分别为

$$
w_{\max}=\rho A^2\omega^2=8.0\times10^{2}\times(1.0\times10^{-4})^2\times(6.28\times10^{3})^2=3.2\times10^{2}\ \text{J/m}^3
$$

$$
\bar w=\frac{1}{2}w_{\max}=1.6\times10^{2}\ \text{J/m}^3
$$

平均能流密度（波的强度）$I=\bar w u$，$60\ \text{s}$ 内通过截面的总能量

$$
E=\bar w\,S\,u\,t=1.6\times10^{2}\times4.0\times10^{-4}\times1.0\times10^{3}\times60=3.8\times10^{3}\ \text{J}
$$

这 60 秒恰含 60000 个周期，因此可直接用平均能量密度计算总能量。

### 题目 9 · 填空题 5

<!-- homework-topic: 两列相干波在 $P$ 点相遇的合振动方程 -->

如图所示，两列相干波在 $P$ 点相遇。一列波在 $B$ 点引起的振动是 $y_{10}=3\times10^{-3}\cos2\pi t$；另一列波在 $C$ 点引起的振动是 $y_{20}=3\times10^{-3}\cos\left(2\pi t+\dfrac{1}{2}\pi\right)$；令 $\overline{BP}=0.45\ \text{m}$，$\overline{CP}=0.30\ \text{m}$，两波的传播速度 $u=0.20\ \text{m/s}$。若不考虑传播途中振幅的减小，则 $P$ 点的合振动的振动方程为 ______。

![B、C 到 P 的两条传播路径](/course-materials/campus-basic-physics/figures/37-05.png)

答案：$y_P=6\times10^{-3}\cos\left(2\pi t-\dfrac{\pi}{2}\right)$（SI），即 $y_P=6\times10^{-3}\sin2\pi t$

【补充解答】由 $\omega=2\pi$ 得 $\nu=1\ \text{Hz}$，$\lambda=u/\nu=0.20\ \text{m}$。两列波到达 $P$ 时各自的相位滞后为 $2\pi r/\lambda$：

$$
\varphi_1=0-\frac{2\pi\times0.45}{0.20}=-4.5\pi,\qquad \varphi_2=\frac{\pi}{2}-\frac{2\pi\times0.30}{0.20}=\frac{\pi}{2}-3\pi=-2.5\pi
$$

两者相差 $\varphi_2-\varphi_1=2\pi$，即同相。故 $P$ 点合振动振幅为两者之和、相位与任一分振动相同（取 $\varphi_1\equiv-4.5\pi+6\pi=\dfrac{3\pi}{2}$）：

$$
A=3\times10^{-3}+3\times10^{-3}=6\times10^{-3}\ \text{m},\qquad y_P=6\times10^{-3}\cos\left(2\pi t+\frac{3\pi}{2}\right)
$$

$$
y_P=6\times10^{-3}\cos\left(2\pi t-\frac{\pi}{2}\right)=6\times10^{-3}\sin2\pi t\quad(\text{SI})
$$

要点：相位差要先算总相位再判断，$4.5\pi$ 与 $2.5\pi$ 的差恰为 $2\pi$，两波同相叠加而不是相消。

## 三、计算题

### 题目 10 · 计算题 1

<!-- homework-topic: 由波源初态求 $x=4\,\mathrm m$ 处的振动表达式与振动速度 -->

平面简谐波沿 $x$ 轴正方向传播，振幅为 $2\ \text{cm}$，频率为 $50\ \text{Hz}$，波速为 $200\ \text{m/s}$。在 $t=0$ 时，$x=0$ 处的质点正在平衡位置向 $y$ 轴正方向运动，求 $x=4\ \text{m}$ 处媒质质点振动的表达式及该点在 $t=2\ \text{s}$ 时的振动速度。

答案：$y=0.02\cos(100\pi t-\pi/2)$（SI）；$v=2\pi\approx6.3\ \text{m/s}$，方向沿 $+y$

【补充解答】$\omega=2\pi\nu=100\pi\ \text{rad/s}$，$\lambda=u/\nu=4\ \text{m}$，$k=\dfrac{2\pi}{\lambda}=\dfrac{\pi}{2}\ \text{m}^{-1}$。波沿 $+x$ 传播：

$$
y=A\cos(\omega t-kx+\varphi_0)
$$

由 $t=0$、$x=0$：$y=0$、$v>0$，即 $\cos\varphi_0=0$、$-A\omega\sin\varphi_0>0$，取 $\varphi_0=-\dfrac{\pi}{2}$：

$$
y=0.02\cos\left(100\pi t-\frac{\pi}{2}x-\frac{\pi}{2}\right)\quad(\text{SI})
$$

$x=4\ \text{m}$ 处（$\dfrac{\pi}{2}\times4=2\pi$）：

$$
y=0.02\cos\left(100\pi t-2\pi-\frac{\pi}{2}\right)=0.02\cos\left(100\pi t-\frac{\pi}{2}\right)
$$

振动速度

$$
v=\frac{\partial y}{\partial t}=-0.02\times100\pi\sin\left(100\pi t-\frac{\pi}{2}\right)=-2\pi\sin\left(100\pi t-\frac{\pi}{2}\right)
$$

$t=2\ \text{s}$ 时相位为 $200\pi-\dfrac{\pi}{2}$，$\sin\left(200\pi-\dfrac{\pi}{2}\right)=-1$：

$$
v=2\pi\approx6.3\ \text{m/s}
$$

方向沿 $+y$。

### 题目 11 · 计算题 2

<!-- homework-topic: 波沿 $-x$ 传播时由 $P$ 点振动曲线求振动方程、波函数与原点振动 -->

一平面简谐波沿 $Ox$ 轴的负方向传播，波长为 $\lambda$，$P$ 处质点的振动规律如图所示。

（1）求 $P$ 处质点的振动方程；

（2）求此波的波动表达式；

（3）若图中 $d=\dfrac{1}{2}\lambda$，求坐标原点 $O$ 处质点的振动方程。

![yP–t 曲线与 O、P 及间距 d](/course-materials/campus-basic-physics/figures/37-06.png)

答案：（1）$y_P=-A\cos(\pi t/2)$ （SI），（2）$y=-A\cos[\pi t/2+2\pi(x-d)/\lambda]$，（3）$y_O=A\cos(\pi t/2)$。

【补充解答】（1）看上方的时间轴。$t=0$ 时 $P$ 点处在最低点 $-A$，$t=1\ \text{s}$ 第一次向上通过平衡位置，历时四分之一周期。所以 $T=4\ \text{s}$，$\omega=\pi/2\ \text{rad/s}$。以正振幅写余弦式，$y_P(0)=-A$ 给出初相 $\pi$。

$$
y_P=A\cos\left(\frac{\pi}{2}t+\pi\right)=-A\cos\frac{\pi}{2}t
$$

（2）波沿 $-x$ 传播，固定相位满足 $\omega t+kx=\text{常量}$，其中 $k=2\pi/\lambda$。以 $P$ 点为基准，$x$ 处在同一时刻相对 $P$ 的相位差为 $k(x-d)$。

$$
y=-A\cos\left[\frac{\pi}{2}t+\frac{2\pi}{\lambda}(x-d)\right]
$$

（3）令 $x=0$，且 $d=\dfrac{\lambda}{2}$ 时 $\dfrac{2\pi d}{\lambda}=\pi$：

$$
y_O=-A\cos\left(\frac{\pi}{2}t-\pi\right)=A\cos\frac{\pi}{2}t
$$

波由 $P$ 传播到 $O$ 需要 $d/u=T/2$，两点相差半个周期。因此 $P$ 点处在波谷时，$O$ 点恰在波峰。

### 题目 12 · 计算题 3

<!-- homework-topic: 两列反向传播的波在 $x=\lambda/4$ 处的合振动与速度 -->

一平面简谐波沿 $Ox$ 轴正方向传播，波的表达式为 $y=A\cos2\pi\left(\nu t-\dfrac{x}{\lambda}\right)$，而另一平面简谐波沿 $Ox$ 轴负方向传播，波的表达式为 $y=2A\cos2\pi\left(\nu t+\dfrac{x}{\lambda}\right)$。

求：（1）$x=\dfrac{\lambda}{4}$ 处介质质点的合振动方程；（2）$x=\dfrac{\lambda}{4}$ 处介质质点的速度表达式。

答案：（1）$y=A\cos\left(2\pi\nu t+\dfrac{\pi}{2}\right)$；（2）$v=-2\pi\nu A\cos2\pi\nu t$

【补充解答】两波同频、同点相遇，直接代数相加。在 $x=\dfrac{\lambda}{4}$ 处，$2\pi\dfrac{x}{\lambda}=\dfrac{\pi}{2}$：

$$
y_1=A\cos\left(2\pi\nu t-\frac{\pi}{2}\right)=A\sin2\pi\nu t,\qquad y_2=2A\cos\left(2\pi\nu t+\frac{\pi}{2}\right)=-2A\sin2\pi\nu t
$$

（1）

$$
y=y_1+y_2=-A\sin2\pi\nu t=A\cos\left(2\pi\nu t+\frac{\pi}{2}\right)
$$

（2）

$$
v=\frac{\partial y}{\partial t}=-2\pi\nu A\cos2\pi\nu t
$$

注意 $y_1$ 沿 $+x$、$y_2$ 沿 $-x$ 传播，虽方向相反但仍是同频振动，叠加只按相位差处理，不需要区分传播方向。

### 题目 13 · 计算题 4

<!-- homework-topic: 固定端反射时的反射波、驻波表达式与波腹波节位置 -->

设入射波的表达式为 $y_1=A\cos2\pi\left(\dfrac{x}{\lambda}+\dfrac{t}{T}\right)$，在 $x=0$ 处发生反射，反射点为一固定端。设反射时无能量损失，求

（1）反射波的表达式；（2）合成的驻波的表达式；

（3）波腹和波节的位置。

答案：（1）$y_2=-A\cos2\pi\left(\dfrac{t}{T}-\dfrac{x}{\lambda}\right)$；（2）$y=-2A\sin\dfrac{2\pi t}{T}\sin\dfrac{2\pi x}{\lambda}$；（3）波节 $x=k\dfrac{\lambda}{2}$，波腹 $x=(2k+1)\dfrac{\lambda}{4}$（$k=0,1,2,\cdots$）

【补充解答】入射波 $y_1=A\cos2\pi\left(\dfrac{x}{\lambda}+\dfrac{t}{T}\right)$ 的相位随 $x$ 增大而增大，是沿 $-x$ 传播、在 $x=0$ 处被反射的波。

（1）反射波沿 $+x$ 传播，振幅不变，设为 $y_2=A\cos\left[2\pi\left(\dfrac{t}{T}-\dfrac{x}{\lambda}\right)+\varphi\right]$。固定端位移恒为零：

$$
y_1(0,t)+y_2(0,t)=A\cos\frac{2\pi t}{T}+A\cos\left(\frac{2\pi t}{T}+\varphi\right)=0\ \Longrightarrow\ \varphi=\pi
$$

$$
y_2=A\cos\left[2\pi\left(\frac{t}{T}-\frac{x}{\lambda}\right)+\pi\right]=-A\cos2\pi\left(\frac{t}{T}-\frac{x}{\lambda}\right)
$$

（2）用和差化积：

$$
\begin{aligned}
y&=y_1+y_2\\
&=A\cos2\pi\left(\frac{t}{T}+\frac{x}{\lambda}\right)
-A\cos2\pi\left(\frac{t}{T}-\frac{x}{\lambda}\right)\\
&=-2A\sin\frac{2\pi t}{T}\sin\frac{2\pi x}{\lambda}
\end{aligned}
$$

（3）振幅分布为 $\left|2A\sin\dfrac{2\pi x}{\lambda}\right|$：

波节 $\sin\dfrac{2\pi x}{\lambda}=0$，即 $x=k\dfrac{\lambda}{2}$（$k=0,1,2,\cdots$），$x=0$ 处为波节，符合固定端条件；

波腹 $\left|\sin\dfrac{2\pi x}{\lambda}\right|=1$，即 $x=(2k+1)\dfrac{\lambda}{4}$。

只取 $x\ge0$ 一侧，故 $k$ 取非负整数。

### 题目 14 · 计算题 5

<!-- homework-topic: 在 $x=l$ 处固定端反射时求反射波表达式 -->

设沿弦线传播的一入射波表达式为：$y_1=A\cos2\pi\left[\left(\dfrac{t}{T}-\dfrac{x}{\lambda}\right)+\varphi\right]$（SI），波在 $x=l$ 处的 $B$ 点发生反射，反射点为固定端，设波在传播过程中振幅不变，求反射波的表达式。

答案：$y_2=A\cos\left[2\pi\left(\dfrac{t}{T}+\dfrac{x}{\lambda}\right)+2\pi\varphi+\pi-\dfrac{4\pi l}{\lambda}\right]$

【补充解答】入射波沿 $+x$ 传播，反射波沿 $-x$ 传播，设

$$
y_2=A\cos\left[2\pi\left(\frac{t}{T}+\frac{x}{\lambda}\right)+\Phi\right]
$$

固定端 $x=l$ 处合位移恒为零，即 $y_2(l,t)=-y_1(l,t)$，等价于相位差 $\pi$：

$$
2\pi\left(\frac{t}{T}+\frac{l}{\lambda}\right)+\Phi=2\pi\left(\frac{t}{T}-\frac{l}{\lambda}\right)+2\pi\varphi+\pi
$$

解得

$$
\Phi=2\pi\varphi+\pi-\frac{4\pi l}{\lambda}
$$

故

$$
y_2=A\cos\left[2\pi\left(\frac{t}{T}+\frac{x}{\lambda}\right)+2\pi\varphi+\pi-\frac{4\pi l}{\lambda}\right]
$$

也可写成 $y_2=-A\cos\left[2\pi\left(\dfrac{t}{T}+\dfrac{x}{\lambda}-\dfrac{2l}{\lambda}\right)+2\pi\varphi\right]$，两种写法等价：前者把固定端带来的 $\pi$ 跃变显式写出，后者把相位原点搬到反射点，便于检查 $x=l$ 处 $y_1+y_2=0$。

---
