---
slug: "06-oscillations"
title: "机械振动"
summary: "简谐运动的描述与动力学，附能量和旋转矢量法。"
updatedAt: "2026-11-19"
content_type: "reference"
group: "course"
displayNumber: "06"
tags: ["基础物理"]
sources: [{"kind": "article", "title": "第6章1-3节 简谐运动的描述 动力学 能量 旋转矢量法.pdf", "url": "https://drive.google.com/file/d/1uGrLb6wpxyAkqH5yhx3PR0yNS_S39_SC/view?usp=drivesdk"}]
---

本章只研究一种运动：物体在平衡位置附近的往复运动。核心是把"回复力正比于位移"翻译成微分方程，再由方程读出振幅、周期、相位三个要素。振动是波动的源头，第 7 章的简谐波就是简谐振动在空间中的传播。

约定：位移 $x$ 一律从平衡位置量起，指向某一侧为正；速度、加速度与 $x$ 同向为正。

## 6.1 简谐运动的描述

### 6.1.1 振动与简谐振动

振动是自然界中一种普遍的运动形式，属于周期运动。一般定义：一个物理量在某一定值附近作周期性变化，相应的物理现象称为振动。机械振动则是物体在平衡位置附近作来回往复的周期运动。

简谐振动是一切振动中最基本、最简单的形式。任何复杂的振动都可以看成由简谐振动合成，所以研究简谐振动是研究其他振动的基础。

### 6.1.2 弹簧振子模型

弹簧振子由轻弹簧加质点组成：弹簧质量忽略、劲度系数为 $k$，质点质量为 $m$，不计摩擦。质点在回复力和惯性的交替作用下运动：偏离平衡位置时弹簧把它拉回，回到平衡位置时惯性又使它冲过去。

设平衡位置为 $x=0$，弹簧对质点的力为

$$
f=-kx=ma
$$

负号表示力总指向平衡位置，与位移方向相反。代入 $a=d^2x/dt^2$：

$$
\frac{d^2x}{dt^2}+\frac{k}{m}x=0
$$

令

$$
\omega^2=\frac{k}{m}
$$

则

$$
\frac{d^2x}{dt^2}+\omega^2x=0
$$

这是简谐振动的微分方程，也是简谐振动的定义式之一。其解为

$$
x=A\cos(\omega t+\varphi)
$$

即简谐振动的位移。对时间求导得速度、加速度：

$$
v=\frac{dx}{dt}=-A\omega\sin(\omega t+\varphi)
$$

$$
a=\frac{dv}{dt}=-\omega^2A\cos(\omega t+\varphi)=-\omega^2x
$$

最后一步很关键：**加速度与位移成正比、方向相反**，这是简谐振动的运动学标志。凡满足 $a=-\omega^2x$ 的运动就是简谐振动，$\omega$ 由系统本身决定。

### 6.1.3 周期性、周期与频率

简谐振动的位移、速度、加速度都是时间的周期函数。周期 $T$、频率 $\nu$、圆频率 $\omega$ 的关系为

$$
T=\frac{2\pi}{\omega},\qquad \nu=\frac{1}{T},\qquad \omega=\frac{2\pi}{T}=2\pi\nu
$$

对弹簧振子，代入 $\omega^2=k/m$：

$$
T=2\pi\sqrt{\frac{m}{k}}
$$

周期仅由振子本身的力学性质（$m$、$k$）决定，与振幅、初相位无关，称为固有周期；相应的 $\nu$、$\omega$ 称为固有频率、固有圆频率。

> 这一点常被误解：振幅变大，质点运动的路程变长、速度也变大，但往返一次的时间不变。周期不由"初始条件"决定，只由系统参数决定。

### 6.1.4 振幅与相位

在 $x=A\cos(\omega t+\varphi)$ 中：

- $A$ 为振幅，是质点离开平衡位置的最大位移，$A>0$；
- $\omega t+\varphi$ 为振动的相位（周相）；
- $\varphi$ 为初相位，即 $t=0$ 时刻的相位。

相位的意义：当 $A$、$\omega$ 一定时，任一时刻 $t$ 的振动状态完全取决于 $\omega t+\varphi$。一定的相位对应一个确定的运动状态（位置和速度方向都确定）。

一个周期内，$\omega t+\varphi$ 从 $0$ 单调变到 $2\pi$，每个值只取一次，所以物体经历的运动状态各不相同、不会重复；同一周期内找不到 $x$、$v$、$a$ 三者全同的两个时刻。两个相同的运动状态之间的相位差必为 $2\pi$ 的整数倍。

![](/course-materials/campus-basic-physics/figures/06-01.png)

从图中可直接读出：$x$ 取极值时 $v=0$、$|a|$ 最大；$x=0$ 时 $|v|$ 最大、$a=0$。三条曲线的"错位"就是相位差。

### 6.1.5 相位差

设两个同频率的振动

$$
x_1=A_1\cos(\omega t+\varphi_1),\qquad x_2=A_2\cos(\omega t+\varphi_2)
$$

相位差

$$
\Delta\varphi=(\omega t+\varphi_2)-(\omega t+\varphi_1)=\varphi_2-\varphi_1
$$

同频率时相位差恒定，等于初相差。一般情形（频率可以不同）：

$$
\Delta\varphi=(\omega_2t+\varphi_2)-(\omega_1t+\varphi_1)=(\omega_2-\omega_1)t+(\varphi_2-\varphi_1)
$$

两种特殊情形：

- $\Delta\varphi=2k\pi\ (k=0,\pm1,\pm2,\cdots)$：两振动同相，步调完全同步；
- $\Delta\varphi=(2k+1)\pi$：两振动反相，步调完全相反。

同一振动内部，位移、速度、加速度的相位关系为

$$
v=-A\omega\sin(\omega t+\varphi)=A\omega\cos\left(\omega t+\varphi+\frac{\pi}{2}\right)
$$

$$
a=-A\omega^2\cos(\omega t+\varphi)=A\omega^2\cos(\omega t+\varphi+\pi)
$$

所以 $v$ 比 $x$ 超前 $\pi/2$，$a$ 比 $x$ 超前 $\pi$，即 $a$ 与 $x$ 反相。

### 6.1.6 由初始条件确定振幅和初相位

设 $t=0$ 时 $x=x_0$、$v=v_0$，则

$$
x_0=A\cos\varphi,\qquad v_0=-A\omega\sin\varphi
$$

两式平方相加消去 $\varphi$：

$$
A=\sqrt{x_0^2+\left(\frac{v_0}{\omega}\right)^2}
$$

两式相除：

$$
\tan\varphi=-\frac{v_0}{\omega x_0}
$$

**$\arctan$ 只给出 $\pm$ 两个候选值，必须用 $x_0$、$v_0$ 的符号定象限**，这是本节最容易出错的地方：

| $x_0$ | $v_0$ | 象限 | $\varphi$ 范围 |
|---|---|---|---|
| $>0$ | $>0$ | 第四象限 | $-\pi/2<\varphi<0$ |
| $<0$ | $>0$ | 第三象限 | $-\pi<\varphi<-\pi/2$ |
| $<0$ | $<0$ | 第二象限 | $\pi/2<\varphi<\pi$ |
| $>0$ | $<0$ | 第一象限 | $0<\varphi<\pi/2$ |

判据来源就是 $x_0=A\cos\varphi$（定 $\cos\varphi$ 的符号）与 $v_0=-A\omega\sin\varphi$（定 $\sin\varphi$ 的符号）。

### 例 6.1 由初始条件求初相位

例：一谐振动 $x_0=0.3\ \text{cm}$，$v_0=3\ \text{cm/s}$，$\omega=10\ \text{rad/s}$，求初相位 $\varphi$。

解：

$$
\tan\varphi=-\frac{v_0}{\omega x_0}=-\frac{3}{10\times0.3}=-1
$$

$\arctan(-1)$ 给出 $-45^\circ$ 或 $135^\circ$ 两个候选。判别：

$$
x_0=A\cos\varphi>0\Rightarrow\cos\varphi>0
$$

$$
v_0=-A\omega\sin\varphi>0\Rightarrow\sin\varphi<0
$$

$\cos\varphi>0$、$\sin\varphi<0$ 落在第四象限，故

$$
\varphi=-45^\circ\ (\text{即 }315^\circ)
$$

此时振幅

$$
A=\sqrt{x_0^2+\left(\frac{v_0}{\omega}\right)^2}
=\sqrt{0.3^2+\left(\frac{3}{10}\right)^2}=0.42\ \text{cm}
$$

## 6.2 简谐运动的动力学

### 6.2.1 单摆

例：单摆的小角度摆动为简谐运动，求其固有角频率。

![](/course-materials/campus-basic-physics/figures/06-02.png)

解：摆球受重力 $mg$ 与绳张力，取悬点 $o$ 为轴。重力对 $o$ 的力矩为

$$
M=f_\tau\cdot l=-mgl\sin\theta
$$

负号表示力矩使 $\theta$ 减小（总把摆球拉回竖直位置）。摆球对 $o$ 的转动惯量 $J=ml^2$，由转动定律

$$
M=J\alpha=J\frac{d^2\theta}{dt^2}
$$

$$
-mgl\sin\theta=ml^2\frac{d^2\theta}{dt^2}
$$

小角度下 $\sin\theta\approx\theta$，得

$$
\frac{d^2\theta}{dt^2}+\frac{g}{l}\theta=0
$$

这是谐振动方程，角振幅记为 $\theta_0$：

$$
\theta=\theta_0\cos(\omega t+\varphi)
$$

$$
\omega=\sqrt{\frac{g}{l}},\qquad T=2\pi\sqrt{\frac{l}{g}}
$$

要点：单摆的"位移"是角位移 $\theta$，回复"力"是重力矩，所以用转动定律而不是牛顿第二定律；小角度近似 $\sin\theta\approx\theta$ 是把非线性方程化为简谐方程的关键，摆角大时周期会随振幅变长，不再是简谐。

### 例 6.2 弹簧—滑轮—重物系统

例：如图系统初始时平衡静止。若给物体一个向下的初速度 $v_0$，证明物体作简谐振动，并写出振动方程。设 $v_0=1.2\ \text{m/s}$，$m=2\ \text{kg}$，$M=1\ \text{kg}$，$k=60\ \text{N/m}$。

![](/course-materials/campus-basic-physics/figures/06-03.png)

解：设平衡位置 $o$ 时弹簧伸长 $l_0$，此时

$$
mg-kl_0=0
$$

任一时刻，设重物相对平衡位置向下位移为 $x$，则弹簧总伸长 $l_0+x$，绳中张力

$$
T_2=k(l_0+x)
$$

对重物 $m$（向下为正）与滑轮 $M$（半径 $R$，按均质圆盘取 $J=\frac12MR^2$）：

$$
mg-T_1=ma
$$

$$
(T_1-T_2)R=\frac{1}{2}MR^2\alpha
$$

$$
a=R\alpha
$$

联立以上五式，消去 $T_1$、$T_2$、$a$、$\alpha$：

$$
mg-k(l_0+x)-\frac{1}{2}M\frac{d^2x}{dt^2}=m\frac{d^2x}{dt^2}
$$

利用 $mg=kl_0$：

$$
-kx=\left(m+\frac{1}{2}M\right)\frac{d^2x}{dt^2}
$$

$$
\frac{d^2x}{dt^2}+\frac{k}{m+\frac{1}{2}M}x=0
$$

这是简谐振动方程。滑轮转动惯量在绳的位移坐标中等效为 $J/R^2=M/2$，故等效质量为 $m+M/2$。

$$
\omega=\sqrt{\frac{k}{m+\frac{1}{2}M}}
=\sqrt{\frac{60}{2+0.5}}=4.9\ \text{rad/s}
$$

$$
T=\frac{2\pi}{\omega}=1.28\ \text{s}
$$

初始条件：$t=0$ 时 $x_0=0$，$v_0=1.2\ \text{m/s}$（向下为正）。于是

$$
A=\sqrt{x_0^2+\left(\frac{v_0}{\omega}\right)^2}=\frac{v_0}{\omega}=0.24\ \text{m}
$$

$$
x_0=A\cos\varphi=0,\qquad v_0=-A\omega\sin\varphi>0
$$

由第一式 $\cos\varphi=0$，$\varphi=\pm\pi/2$；由第二式 $\sin\varphi<0$，取 $\varphi=-\pi/2$。振动方程为

$$
x=0.24\cos\left(4.9t-\frac{\pi}{2}\right)\ \text{m}
$$

为什么这样取系统：滑轮有质量，绳两侧张力不等，必须把 $m$、$M$ 分开列方程；但 $x$ 只有一个（绳不打滑），所以可用 $a=R\alpha$ 把转动与平动锁在一起。平衡条件 $mg=kl_0$ 必须先写出来，否则常数项消不掉，得不到"回复力正比于 $x$"的形式。

### 例 6.3 浮在水中的方木块

例：边长为 $l$ 的方木块浮于水中静止时，没入水中部分的高度为 $h$。若将木块下压后放手让其运动，试证明当忽略水的阻力时，木块作谐振动。

![浮块振动](/course-materials/campus-basic-physics/figures/06-04.png)

解：以水面为原点、竖直向下为 $x$ 轴正方向。平衡时浮力与重力平衡：

$$
mg-\rho_{\text{水}}hl^2g=0
$$

即 $mg=\rho_{\text{水}}hl^2g$。

任一时刻木块相对平衡位置向下位移 $x$，浸入深度变为 $h+x$，浮力

$$
F_{\text{浮}}=\rho_{\text{水}}(h+x)l^2g
$$

由牛顿第二定律（向下为正）：

$$
mg-F_{\text{浮}}=m\frac{d^2x}{dt^2}
$$

$$
\rho_{\text{水}}hl^2g-\rho_{\text{水}}l^2(h+x)g=m\frac{d^2x}{dt^2}
$$

$$
-\rho_{\text{水}}l^2gx=m\frac{d^2x}{dt^2}
$$

$$
\frac{d^2x}{dt^2}+\frac{\rho_{\text{水}}l^2g}{m}x=0
$$

由平衡条件 $m=\rho_{\text{水}}hl^2$，于是

$$
\omega=\sqrt{\frac{g}{h}},\qquad T=2\pi\sqrt{\frac{h}{g}}
$$

方程形如 $\ddot x+\omega^2x=0$，故为简谐振动。

要点：这里的"回复力"不是弹簧弹力，而是浮力的**增量** $\rho_{\text{水}}l^2gx$；平衡时的浮力已经被重力抵消，不能重复计入。周期只与静止浸入深度 $h$ 有关，与木块质量、边长无直接关系。

**适用范围。** 上面的线性回复力依赖三个前提，超出任一条件就不再是简谐振动：

1. 木块始终**部分浸没**：向上位移不能超过 $h$（否则底面离水），向下位移不能超过 $l-h$（否则没顶），即振幅 $A<\min\{h,\ l-h\}$。
2. **横截面积不变**：用 $l^2$ 作浸水面积，要求木块保持竖直、不倾斜翻滚，否则浸水体积与 $x$ 不再是线性关系。
3. **忽略水的阻力与随动水的附加质量**：实际水中存在粘性阻尼，振动会衰减；严格处理还要把随木块一起运动的那部分水计入等效质量，周期会比 $2\pi\sqrt{h/g}$ 略长。

也就是说，$T=2\pi\sqrt{h/g}$ 是"小振幅、竖直、无阻尼、无附加质量"条件下的理想结果。

## 6.3 简谐运动的能量（补充）

> 课件未含本节，以下按教材通用结论补写，供闭环理解使用。

### 6.3.1 动能、势能与总能量

弹簧振子的弹性势能（取平衡位置为零势能点）：

$$
E_p=\frac{1}{2}kx^2=\frac{1}{2}kA^2\cos^2(\omega t+\varphi)
$$

动能：

$$
E_k=\frac{1}{2}mv^2=\frac{1}{2}mA^2\omega^2\sin^2(\omega t+\varphi)
$$

利用 $\omega^2=k/m$，即 $m\omega^2=k$：

$$
E_k=\frac{1}{2}kA^2\sin^2(\omega t+\varphi)
$$

总机械能：

$$
E=E_k+E_p=\frac{1}{2}kA^2=\frac{1}{2}m\omega^2A^2
$$

总能量守恒，且只由 $k$ 与 $A$ 决定，与相位无关。

### 6.3.2 能量转化的图像

- $x=\pm A$（最大位移处）：$v=0$，$E_k=0$，$E_p=E$ 最大，全部能量以势能形式储存；
- $x=0$（平衡位置）：$|v|=A\omega$ 最大，$E_p=0$，$E_k=E$ 最大，全部能量以动能形式出现；
- 其他位置：动能与势能按 $\sin^2$、$\cos^2$ 互补，此消彼长。

一个周期内的平均值：

$$
\overline{E_k}=\overline{E_p}=\frac{1}{4}kA^2=\frac{E}{2}
$$

由能量关系可直接求速度：

$$
v=\pm\omega\sqrt{A^2-x^2}
$$

这个式子不必解微分方程，常用于已知位置求速率，或由速率反求振幅。

### 例 6.4 用能量求速度（接例 6.2）

例：例 6.2 的系统中 $k=60\ \text{N/m}$，$A=0.24\ \text{m}$，等效质量 $m_{\text{eff}}=2.5\ \text{kg}$。求总能量，以及 $x=0.12\ \text{m}$ 处的动能和速度。

解：

$$
E=\frac{1}{2}kA^2=\frac{1}{2}\times60\times0.24^2=1.73\ \text{J}
$$

$$
E_p=\frac{1}{2}kx^2=\frac{1}{2}\times60\times0.12^2=0.43\ \text{J}
$$

$$
E_k=E-E_p=1.30\ \text{J}
$$

$$
v=\sqrt{\frac{2E_k}{m_{\text{eff}}}}=\sqrt{\frac{2\times1.30}{2.5}}=1.02\ \text{m/s}
$$

也可用 $v=\omega\sqrt{A^2-x^2}=4.9\sqrt{0.24^2-0.12^2}\approx1.02\ \text{m/s}$，两法一致。

## 6.4 旋转矢量法（补充）

> 课件未含本节，以下按教材通用方法补写。

### 6.4.1 方法本身

取一长度为 $A$ 的矢量 $\vec A$，以角速度 $\omega$ 绕原点逆时针匀速转动，$t=0$ 时它与 $x$ 轴正方向的夹角为 $\varphi$。则 $t$ 时刻夹角为 $\omega t+\varphi$，它在 $x$ 轴上的投影为

$$
x=A\cos(\omega t+\varphi)
$$

正好是简谐振动的位移。于是：

- 矢量长度 = 振幅 $A$；
- 转动角速度 = 圆频率 $\omega$；
- 与 $x$ 轴夹角 = 相位 $\omega t+\varphi$；
- 转一圈的时间 = 周期 $T$；
- 投影在 $x$ 轴上的运动 = 简谐振动。

相位差就变成两个旋转矢量的夹角，同相、反相、谁超前多少一目了然。这也解释了"相位"为什么用角度表示。

### 6.4.2 用旋转矢量定初相位

$t=0$ 时，矢量与 $x$ 轴夹角为 $\varphi$，其在 $x$ 轴的投影为 $x_0=A\cos\varphi$；矢量端点速度的投影为 $-A\omega\sin\varphi$，正是 $v_0$。因此：

- $x_0>0$：矢量在右半平面；
- $x_0<0$：矢量在左半平面；
- $v_0>0$ 时，端点速度的水平分量向右，矢量在下半平面。
- $v_0<0$ 时，端点速度的水平分量向左，矢量在上半平面。

两条件一交，$\varphi$ 唯一确定，不必再纠结 $\arctan$ 的两个值。

### 例 6.5 旋转矢量法求相位与时间

例：简谐振动 $x_0=0.3\ \text{cm}$，$v_0=3\ \text{cm/s}$，$\omega=10\ \text{rad/s}$，求 (1) 初相位；(2) 从 $t=0$ 起第一次到达正向最大位移所需时间；(3) 第一次经过平衡位置所需时间。

解 (1)：由例 6.1，$A=0.42\ \text{cm}$，$x_0>0$、$v_0>0$，旋转矢量在第四象限，与 $x$ 轴夹角

$$
\varphi=-45^\circ=-\frac{\pi}{4}
$$

解 (2)：正向最大位移对应相位 $0$（矢量转到 $x$ 轴正向）。从 $-\pi/4$ 转到 $0$，转过

$$
\Delta\varphi=\frac{\pi}{4}
$$

$$
t=\frac{\Delta\varphi}{\omega}=\frac{\pi/4}{10}=\frac{\pi}{40}\approx0.079\ \text{s}
$$

解 (3)：平衡位置 $x=0$ 对应相位 $\pi/2$ 或 $3\pi/2$。第一次到达的是 $\pi/2$（此时速度为负，正越过平衡位置向负方向），从 $-\pi/4$ 转到 $\pi/2$ 转过 $3\pi/4$：

$$
t=\frac{3\pi/4}{10}=\frac{3\pi}{40}\approx0.236\ \text{s}
$$

用旋转矢量法，这类"从某状态到某状态要多久"的问题就是算夹角除以 $\omega$，不需要解三角方程。

## 本章小结

**主线**：振动现象 → 弹簧振子模型 → $f=-kx$ → $\ddot x+\omega^2x=0$ → $x=A\cos(\omega t+\varphi)$ → 由 $A,\omega,\varphi$ 三个要素描述 → 用初始条件定 $A,\varphi$ → 用能量或旋转矢量处理具体问题。

必须记住的几条：

1. 简谐振动的判据是 $a=-\omega^2x$（或 $\ddot x+\omega^2x=0$），不只是"看起来像正弦"。
2. $\omega$ 由系统参数决定（弹簧振子 $\sqrt{k/m}$、单摆 $\sqrt{g/l}$），$A$、$\varphi$ 由初始条件决定。两者不能混。
3. $v$ 比 $x$ 超前 $\pi/2$，$a$ 比 $x$ 超前 $\pi$；同相为 $2k\pi$，反相为 $(2k+1)\pi$。
4. 由 $x_0$、$v_0$ 定 $\varphi$ 时，$\arctan$ 只给候选值，必须用符号定象限。
5. 总能量 $E=\frac12kA^2=\frac12m\omega^2A^2$ 守恒；动能、势能一个周期内平均值各为 $E/2$。
6. 旋转矢量把相位变成角度：投影是位移，夹角是相位差，转一圈是一个周期。

**易错点**：

- 把周期当成与振幅有关；
- 平衡位置设错，导致回复力多出常数项（如例 6.2 忘记 $mg=kl_0$、例 6.3 重复计算静浮力）；
- 初相位只取 $\arctan$ 的主值，不检验 $x_0$、$v_0$ 的符号；
- 有质量滑轮的系统，直接把 $m+M$ 当总质量，忽略滑轮只有 $\frac12M$ 的等效贡献；
- 单摆用牛顿第二定律沿切向列式时不注意"回复力"是重力沿切向的分量，方向与 $\theta$ 相反。

## 原始资料

现有课件覆盖简谐运动的描述和动力学。简谐运动的能量与旋转矢量法两节为补充内容。

- 第6章1-3节 简谐运动的描述 动力学 能量 旋转矢量法.pdf（16 页，实际内容止于 §6-2 的三个动力学例题）
