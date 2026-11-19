---
slug: "homework-06"
title: "第 6 次作业 · 机械振动"
summary: "机械振动的原题与解析。"
updatedAt: "2026-11-19"
content_type: "reference"
group: "homework"
displayNumber: "06"
tags: ["基础物理"]
sources: [{"kind": "article", "title": "6 机械振动习题.pdf", "url": "https://drive.google.com/file/d/1KOF_o7xoGH_gCq0aRHcDq1Rl-RVMRF0d/view?usp=drivesdk"}, {"kind": "article", "title": "6 机械振动习题详解.pdf", "url": "https://drive.google.com/file/d/1K1zArlNlk3CQ99bPzPDRh0Ea77l0dkF4/view?usp=drivesdk"}]
---

填空第 5 题附补充解答，其余题目沿用教师详解。

**一、选择题**

## 题目 1 · 选择题 1

两个质点各自作简谐振动，它们的振幅相同、周期相同，第一个质点的振动方程为 $x_1=A\cos(\omega t+\alpha)$。当第一个质点从相对于其平衡位置的正位移处回到平衡位置时，第二个质点正在最大正位移处，则第二个质点的振动方程为［ ］

（A）$x_2=A\cos\left(\omega t+\alpha+\dfrac{\pi}{2}\right)$；（B）$x_2=A\cos\left(\omega t+\alpha-\dfrac{\pi}{2}\right)$；

（C）$x_2=A\cos\left(\omega t+\alpha-\dfrac{3\pi}{2}\right)$；（D）$x_2=A\cos(\omega t+\alpha+\pi)$。

答案：B

解：第一个质点自正位移处回到平衡位置，此刻其位移为零、速度沿 $-x$ 方向，相位为 $\pi/2$；第二个质点此刻在最大正位移处，相位为 $0$。两质点同频，同一时刻相位之差即初相之差，故第二个质点的相位落后 $\pi/2$，初相为 $\alpha-\dfrac{\pi}{2}$，选 B。

## 题目 2 · 选择题 2

劲度系数分别为 $k_1$ 和 $k_2$ 的两个轻弹簧串联在一起，下面挂着质量为 $m$ 的物体，构成一个竖挂的弹簧振子，则该系统的振动周期为［ ］

（A）$T=2\pi\sqrt{\dfrac{m(k_1+k_2)}{2k_1k_2}}$；（B）$T=2\pi\sqrt{\dfrac{m}{(k_1+k_2)}}$；

（C）$T=2\pi\sqrt{\dfrac{m(k_1+k_2)}{k_1k_2}}$；（D）$T=2\pi\sqrt{\dfrac{2m}{k_1+k_2}}$。

答案：C

解：两弹簧串联，两端受力相同，伸长量相加：

$$
\frac{1}{k}=\frac{1}{k_1}+\frac{1}{k_2}\ \Longrightarrow\ k=\frac{k_1k_2}{k_1+k_2}
$$

代入弹簧振子周期公式 $T=2\pi\sqrt{m/k}$，得

$$
T=2\pi\sqrt{\frac{m(k_1+k_2)}{k_1k_2}}
$$

故答案为 C。

## 题目 3 · 选择题 3

一长为 $l$ 的均匀细棒悬于通过其一端的光滑水平固定轴上（如图），作成一复摆。已知细棒绕通过其一端的轴的转动惯量 $J=\dfrac{1}{3}ml^2$，此摆作微小振动的周期为［ ］

（A）$2\pi\sqrt{\dfrac{l}{g}}$；（B）$2\pi\sqrt{\dfrac{l}{2g}}$；（C）$2\pi\sqrt{\dfrac{2l}{3g}}$；（D）$\pi\sqrt{\dfrac{l}{3g}}$。

答案：C

解：复摆作微小振动时，重力矩 $M=-mgd\sin\theta\approx-mgd\theta$，与角位移成正比而反向，故

$$
T=2\pi\sqrt{\frac{J}{mgd}}
$$

此处轴到质心的距离 $d=\dfrac{l}{2}$，代入 $J=\dfrac{1}{3}ml^2$：

$$
T=2\pi\sqrt{\frac{ml^2/3}{mg\,l/2}}=2\pi\sqrt{\frac{2l}{3g}}
$$

故选 C。注意这里必须用轴到质心的距离 $l/2$，不能把 $d$ 写成 $l$。

## 题目 4 · 选择题 4

一个质点作简谐振动，振幅为 $A$，在起始时刻质点的位移为 $\dfrac{1}{2}A$，且向 $x$ 轴的正方向运动，代表此简谐振动的旋转矢量图为［ ］

![旋转矢量图四个选项](/course-materials/campus-basic-physics/figures/36-01.png)

答案：B

解：由 $x_0=A\cos\varphi_0=\dfrac{1}{2}A$ 得 $\cos\varphi_0=\dfrac{1}{2}$，即 $\varphi_0=\pm\dfrac{\pi}{3}$；又 $v_0=-A\omega\sin\varphi_0>0$，要求 $\sin\varphi_0<0$，故

$$
\varphi_0=-\frac{\pi}{3}\quad\left(\text{或}\ \frac{5\pi}{3}\right)
$$

旋转矢量位于第四象限、矢量端点在 $x$ 轴下方偏右，选 B。

## 题目 5 · 选择题 5

一物体作简谐振动，振动方程为 $x=A\cos\left(\omega t+\dfrac{1}{2}\pi\right)$。则该物体在 $t=0$ 时刻的动能与 $t=T/8$（$T$ 为振动周期）时刻的动能之比为［ ］

（A）1:4；（B）1:2；（C）1:1；（D）2:1。

答案：D

解：速度为 $v=-A\omega\sin\left(\omega t+\dfrac{\pi}{2}\right)$，动能 $E_k=\dfrac{1}{2}mA^2\omega^2\sin^2\left(\omega t+\dfrac{\pi}{2}\right)=\dfrac{1}{2}mA^2\omega^2\cos^2\omega t$。

$t=0$ 时 $\cos^2 0=1$，$E_{k0}=\dfrac{1}{2}mA^2\omega^2$；$t=T/8$ 时 $\omega t=\dfrac{\pi}{4}$，$\cos^2\dfrac{\pi}{4}=\dfrac{1}{2}$，$E_{k1}=\dfrac{1}{4}mA^2\omega^2$。比值为 $2:1$，选 D。

**二、填空题**

## 题目 6 · 填空题 1

一简谐振动用余弦函数表示，其振动曲线如图所示，则此简谐振动的三个特征量为 $A=$ ______ cm；$\omega=$ ______ rad/s；$\varphi=$ ______。

![x-t 振动曲线](/course-materials/campus-basic-physics/figures/36-02.png)

答案：10；$\dfrac{\pi}{6}$；$\dfrac{\pi}{3}$

解：由曲线直接读出振幅 $A=10\ \text{cm}$。曲线在 $t=1\ \text{s}$ 与 $t=7\ \text{s}$ 两次过零（一次向下、一次向上），相邻两次过零间隔为半个周期，即 $\dfrac{T}{2}=6\ \text{s}$，故 $T=12\ \text{s}$，

$$
\omega=\frac{2\pi}{T}=\frac{\pi}{6}\ \text{rad/s}
$$

$t=0$ 时 $x_0=5\ \text{cm}=\dfrac{A}{2}$，且下一时刻向平衡位置（$-x$）移动，故 $\cos\varphi_0=\dfrac{1}{2}$、$\sin\varphi_0>0$，取 $\varphi_0=\dfrac{\pi}{3}$。

## 题目 7 · 填空题 2

一水平弹簧简谐振子的振动曲线如图所示。当振子处在位移为零、速度为 $-\omega A$、加速度为零和弹性力为零的状态时，应对应于曲线上的 ______ 点；当振子处在位移的绝对值为 $A$、速度为零、加速度为 $-\omega^2A$ 和弹性力为 $-kA$ 的状态时，应对应于曲线上的 ______ 点。

![带 a–f 标记的 x-t 曲线](/course-materials/campus-basic-physics/figures/36-03.png)

答案：（b，f）；（a，e）

解：位移为零、速度取负的最大值 $-\omega A$ 时，振子正以最大速率向 $-x$ 方向通过平衡点，加速度与弹性力均为零，对应曲线上向下穿过 $t$ 轴的点，即 b 与 f。

位移绝对值为 $A$、速度为零、加速度和弹性力都为负的最大值，对应曲线上的正峰值 a 与 e（$x=+A$，$a=-\omega^2A$，$F=-kA$）。

## 题目 8 · 填空题 3

两个同方向的简谐振动曲线如图所示。其合振动的振幅为 ______；合振动的振动方程为 ______。

![x1(t) 与 x2(t) 两条曲线](/course-materials/campus-basic-physics/figures/36-04.png)

答案：$A_2-A_1$；$x=(A_2-A_1)\cos\left(\dfrac{2\pi}{T}t+\dfrac{\pi}{2}\right)$

解：由曲线可见两振动同时过零且方向相反，相位差为 $\pi$，即反相。反相合成的振幅为两振幅之差，$A_2>A_1$，故

$$
A=A_2-A_1
$$

反相时合振动与振幅较大的 $x_2$ 同相。由图 $x_2$ 在 $t=0$ 处于零并向下，即 $\varphi_2=\dfrac{\pi}{2}$，故

$$
x=(A_2-A_1)\cos\left(\frac{2\pi}{T}t+\frac{\pi}{2}\right)
$$

## 题目 9 · 填空题 4

在一竖直轻弹簧下端悬挂质量 $m=5\ \text{g}$ 的小球，弹簧伸长 $l=1\ \text{cm}$ 而平衡。经推动后，该小球在竖直方向作振幅为 $A=4\ \text{cm}$ 的振动，则小球的振动周期为 ______；振动能量为 ______。

答案：$0.201\ \text{s}$；$3.92\times10^{-3}\ \text{J}$

解：平衡时 $k\Delta l=mg$，故 $k=\dfrac{mg}{\Delta l}$。

（1）周期只由 $k$、$m$ 决定，与振幅无关：

$$
T=2\pi\sqrt{\frac{m}{k}}=2\pi\sqrt{\frac{\Delta l}{g}}=2\pi\sqrt{\frac{0.01}{9.8}}=0.201\ \text{s}
$$

（2）简谐振动总能量等于最大势能：

$$
E=\frac{1}{2}kA^2=\frac{1}{2}\frac{mg}{\Delta l}A^2=\frac{1}{2}\times\frac{0.005\times9.8}{0.01}\times(0.04)^2=3.92\times10^{-3}\ \text{J}
$$

## 题目 10 · 填空题 5

为测定某音叉 $C$ 的频率，选取频率已知且与 $C$ 接近的另两个音叉 $A$ 和 $B$，已知 $A$ 的频率为 $800\ \text{Hz}$，$B$ 的频率是 $797\ \text{Hz}$，进行下面试验：

第一步，使音叉 $A$ 和 $C$ 同时振动，测得拍频为每秒 2 次。

第二步，使音叉 $B$ 和 $C$ 同时振动，测得拍频为每秒 5 次。

由此可确定音叉 $C$ 的频率为 ______。

答案：$802\ \text{Hz}$

【补充解答】详解未收此题。拍频等于两频率之差：

$$
|\nu_C-800|=2\ \Longrightarrow\ \nu_C=798\ \text{或}\ 802\ \text{Hz}
$$

$$
|\nu_C-797|=5\ \Longrightarrow\ \nu_C=792\ \text{或}\ 802\ \text{Hz}
$$

两组解只有 $\nu_C=802\ \text{Hz}$ 同时成立，故音叉 $C$ 的频率为 $802\ \text{Hz}$。两次测量的公共解唯一，这正是“换一个已知音叉复核”能消除拍频二义性的原因。

**三、计算题**

## 题目 11 · 计算题 1

在一竖直轻弹簧的下端悬挂一小球，弹簧被拉长 $l_0=1.2\ \text{cm}$ 而平衡。再经拉动后，该小球在竖直方向作振幅为 $A=2\ \text{cm}$ 的振动，试证此振动为简谐振动；选小球在正最大位移处开始计时，写出此振动的数值表达式。

答案：$x=2\times10^{-2}\cos(9.1\pi t)$（SI）

解：设小球质量为 $m$，平衡时弹簧劲度系数

$$
k=\frac{mg}{l_0}
$$

取平衡位置为原点、向下为 $x$ 轴正向。小球在 $x$ 处时，弹簧总伸长 $l_0+x$，由牛顿第二定律

$$
mg-k(l_0+x)=m\frac{\mathrm{d}^2x}{\mathrm{d}t^2}
$$

代入 $k=\dfrac{mg}{l_0}$ 并整理：

$$
\frac{\mathrm{d}^2x}{\mathrm{d}t^2}+\frac{g}{l_0}x=0
$$

加速度与位移成正比且反向，故为简谐振动，角频率

$$
\omega=\sqrt{\frac{g}{l_0}}=\sqrt{\frac{9.8}{0.012}}=28.6\ \text{rad/s}=9.1\pi\ \text{rad/s}
$$

设 $x=A\cos(\omega t+\varphi)$。$t=0$ 时小球在正最大位移处，$x_0=A$、$v_0=0$，故 $\varphi=0$：

$$
x=2\times10^{-2}\cos(9.1\pi t)\quad(\text{SI})
$$

## 题目 12 · 计算题 2

一质量 $m=0.25\ \text{kg}$ 的物体，在弹簧的力作用下沿 $x$ 轴运动，平衡位置在原点，弹簧的劲度系数 $k=25\ \text{N/m}$。

（1）求振动的周期 $T$ 和角频率 $\omega$；

（2）如果振幅 $A=15\ \text{cm}$，$t=0$ 时物体位于 $x=7.5\ \text{cm}$ 处，且物体沿 $x$ 轴反向运动，求初速 $v_0$ 及初相 $\varphi$；

（3）写出振动方程表达式。

答案：（1）$T=0.63\ \text{s}$，$\omega=10\ \text{rad/s}$；（2）$v_0=-1.3\ \text{m/s}$，$\varphi=\dfrac{\pi}{3}$；（3）$x=15\times10^{-2}\cos\left(10t+\dfrac{\pi}{3}\right)$（SI）

解：（1）

$$
\omega=\sqrt{\frac{k}{m}}=\sqrt{\frac{25}{0.25}}=10\ \text{rad/s},\qquad T=\frac{2\pi}{\omega}=0.63\ \text{s}
$$

（2）由振幅与 $t=0$ 状态的关系

$$
A=\sqrt{x_0^2+\frac{v_0^2}{\omega^2}}
$$

得

$$
v_0=-\omega\sqrt{A^2-x_0^2}=-10\times\sqrt{0.15^2-0.075^2}=-1.3\ \text{m/s}
$$

取负号是因为物体沿 $-x$ 方向运动（“反向”）。初相由

$$
\tan\varphi=-\frac{v_0}{\omega x_0},\qquad \cos\varphi=\frac{x_0}{A}>0
$$

得 $\varphi=\dfrac{\pi}{3}$（另一个解 $\dfrac{4\pi}{3}$ 对应 $x_0<0$，舍去）。

（3）

$$
x=15\times10^{-2}\cos\left(10t+\frac{\pi}{3}\right)\quad(\text{SI})
$$

## 题目 13 · 计算题 3

一质点作简谐振动，其振动方程为

$$
x=6.0\times10^{-2}\cos\left(\frac{1}{3}\pi t-\frac{1}{4}\pi\right)\quad(\text{SI})
$$

（1）当 $x$ 值为多大时，系统的势能为总能量的一半？

（2）质点从平衡位置移动到上述位置所需最短时间为多少？

答案：（1）$x=\pm4.24\times10^{-2}\ \text{m}$；（2）$0.75\ \text{s}$

解：（1）势能 $W_p=\dfrac{1}{2}kx^2$，总能量 $E=\dfrac{1}{2}kA^2$。令 $W_p=\dfrac{1}{2}E$，即 $\dfrac{1}{2}kx^2=\dfrac{1}{4}kA^2$：

$$
x=\pm\frac{A}{\sqrt{2}}=\pm\frac{6.0\times10^{-2}}{\sqrt{2}}=\pm4.24\times10^{-2}\ \text{m}
$$

（2）周期

$$
T=\frac{2\pi}{\omega}=\frac{2\pi}{\pi/3}=6\ \text{s}
$$

从平衡位置到 $|x|=A/\sqrt{2}$ 走过的相位为 $\pi/4$，对应最短时间

$$
\Delta t=\frac{T}{8}=0.75\ \text{s}
$$

## 题目 14 · 计算题 4

一质量 $M=3.96\ \text{kg}$ 的物体，悬挂在劲度系数 $k=400\ \text{N/m}$ 的轻弹簧下端。一质量 $m=40\ \text{g}$ 的子弹以 $v=152\ \text{m/s}$ 的速度从下方竖直朝上射入物体之中，然后子弹与物体一起作谐振动。若取平衡位置为原点，$x$ 轴指向下方（如图），求：

（1）振动方程（因 $m\ll M$，$m$ 射入 $M$ 后对原来平衡位置的影响可以忽略）；

（2）弹簧振子的总能量。

![弹簧、重物 M 与自下而上的子弹 m，x 轴向下](/course-materials/campus-basic-physics/figures/36-05.png)

答案：（1）$x=0.152\cos\left(10t+\dfrac{\pi}{2}\right)$（SI）；（2）$E=4.62\ \text{J}$

解：（1）子弹射入为完全非弹性碰撞，动量守恒：

$$
mv=(M+m)V\ \Longrightarrow\ V=\frac{mv}{M+m}=\frac{0.040\times152}{4.00}=1.52\ \text{m/s}
$$

碰后系统角频率

$$
\omega_0=\sqrt{\frac{k}{M+m}}=\sqrt{\frac{400}{4.00}}=10\ \text{rad/s}
$$

因 $m\ll M$，碰撞瞬间物体仍在原平衡位置，$t=0$ 时 $x_0=0$，而速度向上，与 $x$ 轴正向（向下）相反，$v_0=-V=-1.52\ \text{m/s}$。由 $x=A\cos(\omega_0t+\varphi)$：

$$
x_0=A\cos\varphi=0,\qquad v_0=-A\omega_0\sin\varphi=-1.52
$$

得 $\varphi=\dfrac{\pi}{2}$，$A=\dfrac{V}{\omega_0}=0.152\ \text{m}$，故

$$
x=0.152\cos\left(10t+\frac{\pi}{2}\right)\quad(\text{SI})
$$

（2）以碰后平衡位置为振动势能零点，势能项为重力势能和弹性势能之和。按题设忽略平衡位置的移动，碰后瞬间 $x_0=0$，因此振动机械能等于此刻的动能。

$$
E=\frac{1}{2}(M+m)V^2=\frac{1}{2}\times4.00\times1.52^2=4.62\ \text{J}
$$

## 题目 15 · 计算题 5

一质点同时参与两个同方向的简谐振动，其振动方程分别为

$$
x_1=5\times10^{-2}\cos\left(4t+\frac{\pi}{3}\right)\ (\text{SI}),\qquad x_2=3\times10^{-2}\sin\left(4t-\frac{\pi}{6}\right)\ (\text{SI})
$$

画出两振动的旋转矢量图，并求合振动的振动方程。

答案：合振动 $x=2\times10^{-2}\cos\left(4t+\dfrac{\pi}{3}\right)$（SI）

解：先把 $x_2$ 化为余弦形式，正弦化余弦需减去 $\dfrac{\pi}{2}$：

$$
x_2=3\times10^{-2}\cos\left(4t-\frac{\pi}{6}-\frac{\pi}{2}\right)=3\times10^{-2}\cos\left(4t-\frac{2\pi}{3}\right)
$$

两振动同频，相位差

$$
\Delta\varphi=\frac{\pi}{3}-\left(-\frac{2\pi}{3}\right)=\pi
$$

即两旋转矢量方向相反。此时合振幅为两振幅之差，合振动取振幅较大者的相位：

$$
A=5\ \text{cm}-3\ \text{cm}=2\ \text{cm},\qquad \varphi=\frac{\pi}{3}
$$

$$
x=2\times10^{-2}\cos\left(4t+\frac{\pi}{3}\right)\quad(\text{SI})
$$

要点：反相合成不能用勾股定理求振幅，只能直接相减，且合振动与振幅大的分振动同相。

## 题目 16 · 计算题 6

一质量为 $0.01\ \text{kg}$ 的物体作简谐运动，其振幅为 $0.08\ \text{m}$，周期为 $4\ \text{s}$，起始时刻物体在 $x=0.04\ \text{m}$ 处，向 $Ox$ 轴负方向运动（如图）。试求

（1）$t=1\ \text{s}$ 时，物体所处的位置和所受的力；

（2）由起始位置运动到 $x=-0.04\ \text{m}$ 处所需要的最短时间。

![x 轴上 −0.08、−0.04、0.04、0.08 及 v 方向](/course-materials/campus-basic-physics/figures/36-06.png)

答案：（1）$x=-0.069\ \text{m}$，$F=1.70\times10^{-3}\ \text{N}$（沿 $+x$ 方向）；（2）$0.667\ \text{s}$

解：角频率 $\omega=\dfrac{2\pi}{T}=\dfrac{\pi}{2}\ \text{rad/s}$。设 $x=A\cos(\omega t+\varphi)$，$t=0$ 时 $x_0=0.04\ \text{m}=\dfrac{A}{2}$、$v_0<0$，故 $\varphi=\dfrac{\pi}{3}$：

$$
x=(0.08\ \text{m})\cos\left[\left(\frac{\pi}{2}\ \text{s}^{-1}\right)t+\frac{\pi}{3}\right]
$$

（1）$t=1.0\ \text{s}$ 代入：

$$
x=0.08\cos\left(\frac{\pi}{2}+\frac{\pi}{3}\right)=0.08\cos\frac{5\pi}{6}=-0.069\ \text{m}
$$

受力由 $F=-kx=-m\omega^2x$：

$$
F=-(0.01\ \text{kg})\left(\frac{\pi}{2}\ \text{s}^{-1}\right)^2(-0.069\ \text{m})=1.70\times10^{-3}\ \text{N}
$$

方向沿 $+x$（指向平衡位置）。

（2）$x=-0.04\ \text{m}=-\dfrac{A}{2}$ 且继续向负方向运动，相位为 $\dfrac{2\pi}{3}$，故转过的相位

$$
\omega t=\frac{2\pi}{3}-\frac{\pi}{3}=\frac{\pi}{3}\ \Longrightarrow\ t=\frac{\pi/3}{\pi/2}=\frac{2}{3}\ \text{s}=0.667\ \text{s}
$$

也可由旋转矢量图直接读出：初矢量在 $\pi/3$，末矢量在 $2\pi/3$，夹角 $\pi/3$ 即最短时间。

---
