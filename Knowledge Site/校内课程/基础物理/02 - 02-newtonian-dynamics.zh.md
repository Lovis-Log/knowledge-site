---
slug: "02-newtonian-dynamics"
title: "牛顿运动定律与质点动力学"
summary: "牛顿运动定律、常见力、受力分析与动力学例题。"
updatedAt: "2026-11-19"
content_type: "reference"
group: "course"
displayNumber: "02"
tags: ["基础物理"]
sources: [{"kind": "article", "title": "第2章1节 牛顿运动定律.pdf", "url": "https://drive.google.com/file/d/1tV00qIBfsMsOZIoXOaAc6XY3eiJG0Rk0/view?usp=drivesdk"}, {"kind": "article", "title": "第2章2节 几种常见的力.pdf", "url": "https://drive.google.com/file/d/10VHoBAB-edBBWDKeKI3mdiQ6No4AcUkU/view?usp=drivesdk"}, {"kind": "article", "title": "第2章-4节 应用牛顿力学解题.pdf", "url": "https://drive.google.com/file/d/13JH8NluRSXRkRBT5jirLCwJVSMJZcqjg/view?usp=drivesdk"}, {"kind": "article", "title": "第2章-4节 应用牛顿力学解题(2).pdf", "url": "https://drive.google.com/file/d/1H_C7K935NccAZX9davmKF5RxI53K55W_/view?usp=drivesdk"}, {"kind": "article", "title": "第2章-4节 应用牛顿力学解题(3).pdf", "url": "https://drive.google.com/file/d/13WjUsS_skVKNeMOLBE4eTqU2rMqtBg8E/view?usp=drivesdk"}]
---

## 2.1 牛顿运动定律

### 2.1.1 第一定律与惯性系

**牛顿第一定律（惯性定律）**：任何物体都将保持它静止或匀速直线运动的状态，直到其他物体的作用迫使它改变这种状态为止。

它的意义有三层：

- 物体具有**惯性**——维持原有运动状态的性质；
- **外力**是物体运动状态（速度）改变的原因；
- 定律本身只在**惯性系**中成立。

**惯性系**：对任何物体，牛顿运动定律均成立的参照系。由此得到惯性系的传递性——相对于一个惯性系作匀速直线运动的参照系也是惯性系。地面、太阳在绝大多数问题中可作近似惯性系；非惯性系中牛顿定律不成立（第 3 章之后若遇到加速参照系需另加惯性力，本课程不展开）。

第一定律不是第二定律的特例（$F=0$ 时 $a=0$）：它独立地回答了"惯性系在哪里"这个前提问题——没有第一定律，第二定律无从谈起。

### 2.1.2 第二定律

$$
\vec F=\sum\vec F_i=\frac{\mathrm d\vec p}{\mathrm dt}=\frac{\mathrm d(m\vec v)}{\mathrm dt}
$$

当 $v\ll c$、$m=\text{const}$ 时退化为中学熟悉的形式

$$
\vec F=m\frac{\mathrm d\vec v}{\mathrm dt}=m\vec a\qquad\Longrightarrow\qquad \vec a=\frac{\sum\vec F_i}{m}
$$

第二定律有三条物理意义。

- **定量性**：力改变物体的动量，$F$ 的大小等于动量对时间的变化率；
- **瞬时性**：$\vec F$ 与 $\vec a$ 同时出现、同时消失，不存在"力的惯性作用"；
- **矢量性**：力和加速度都是矢量，方向一致；分量式独立成立。

**分量式**（直角坐标）：

$$
F_x=ma_x=m\frac{\mathrm d v_x}{\mathrm dt}=m\frac{\mathrm d^{2}x}{\mathrm dt^{2}}
$$

$$
F_y=ma_y=m\frac{\mathrm d v_y}{\mathrm dt}=m\frac{\mathrm d^{2}y}{\mathrm dt^{2}}
$$

$$
F_z=ma_z=m\frac{\mathrm d v_z}{\mathrm dt}=m\frac{\mathrm d^{2}z}{\mathrm dt^{2}}
$$

**自然坐标**（沿轨迹分解）：

$$
F_\tau=ma_\tau=m\frac{\mathrm dv}{\mathrm dt},\qquad F_n=ma_n=m\frac{v^{2}}{\rho}
$$

这两式是圆周运动、曲线运动问题的标准列式方式：法向方程里出现 $v^{2}/\rho$，切向方程管速率变化。

### 2.1.3 第三定律

$$
\vec F_{12}=-\vec F_{21}
$$

- 作用力与反作用力成对出现、同时消失；
- 两力分别作用于**不同物体**，产生不同效果，不能相互抵消；
- 作用力与反作用力是**同一性质**的力（引力对引力、弹力对弹力、摩擦力对摩擦力）。

典型图景：气球受地球引力 $mg$ 与地球受气球引力 $-mg$；人推墙，墙同时推人；汽车驱动轮给地面向后的力，地面给车向前的力。

**易错点**：把作用力与反作用力当成"平衡力"。平衡力作用在同一物体上、可以抵消；作用力与反作用力作用在两个物体上，永远不能求合力。

## 2.2 几种常见的力

### 2.2.1 万有引力

质量 $m_1$、$m_2$、相距 $r$ 的两质点之间的引力大小

$$
F=G\frac{m_1m_2}{r^{2}},\qquad G=6.67\times10^{-11}\ \mathrm{m^{3}\cdot kg^{-1}\cdot s^{-2}}
$$

矢量形式（$\vec r^{0}$ 为由 $m_1$ 指向 $m_2$ 的单位矢量）：

$$
\vec F_{21}=-G\frac{m_1m_2}{r^{2}}\vec r^{0}
$$

说明：

1. 由万有引力定义的质量叫**引力质量**，天平称量测得的就是引力质量；由牛顿第二定律定义的质量叫**惯性质量**。实验表明同一物体的两种质量总相等，这是广义相对论等效原理的实验基础。
2. 万有引力定律**只直接适用于两质点**。对连续体必须先取质量元、再积分。

**例 2.1 质点与均匀杆的引力**

一质点 $m$ 旁边放一长 $L$、质量 $M$ 的均匀杆，杆离质点近端距离为 $l$，求系统万有引力大小。

![](/course-materials/campus-basic-physics/figures/02-01.png)

不能直接把 $r=l+L/2$ 代入平方反比式（$|F|=GmM/l^{2}$ 更是错的）。取杆上距质点为 $x$ 处、长 $\mathrm dx$ 的质量元 $\mathrm dM=\lambda\,\mathrm dx=\dfrac{M}{L}\mathrm dx$，它与质点的引力

$$
\mathrm df=G\frac{m\,\mathrm dM}{x^{2}}=G\frac{mM}{L}\frac{\mathrm dx}{x^{2}}
$$

积分

$$
f=\int_{l}^{l+L}\mathrm df=G\frac{mM}{L}\int_{l}^{l+L}\frac{\mathrm dx}{x^{2}}=G\frac{mM}{l(l+L)}
$$

当 $l\gg L$ 时 $l(l+L)\approx l^{2}$，

$$
G\frac{mM}{l(l+L)}\ \longrightarrow\ G\frac{mM}{l^{2}}
$$

杆退化为质点，与平方反比式一致——这是检验结果是否合理的常用手段。

### 2.2.2 绳的张力

设绳 $MN$ 两端受拉力 $\vec f_1$、$\vec f_2$。在某点 $P$ 把绳想象切开，分成 $MP$、$NP$ 两段，其间的作用力大小 $T$ 叫绳在该点的**张力**。

设绳以竖直加速度 $a$ 运动，线密度 $\lambda$，取长 $\Delta l$ 的一小段，它两端张力不同：

$$
T(l+\Delta l)-T(l)-\lambda g\,\Delta l=\lambda\,\Delta l\,a
$$

在这段有质量、竖直加速的绳上，张力随位置变化。质量可忽略的绳段若沿绳方向没有其他分布力，其两端张力大小相等。

题目中的轻绳在上述条件下可用同一张力表示。跨过滑轮时，还要结合滑轮是否有转动惯量、是否受阻力矩判断两侧张力是否相等。绳对物体的拉力沿绳、指向绳内。

### 2.2.3 摩擦力与流体阻力

**静摩擦力**：两物体接触、保持相对静止，但沿接触面有**相对运动趋势**时，接触面间产生阻止该趋势的力。它的大小随外力变化，范围是

$$
0\le f\le f_{\max}=\mu_0N
$$

$\mu_0$ 为最大静摩擦系数，$N$ 为正压力。方向沿接触面、与相对运动趋势相反。

**滑动摩擦力**：两物体接触并有**相对滑动**时出现的摩擦力，

$$
f=\mu N
$$

$\mu$ 为滑动摩擦系数。方向沿接触面、与相对滑动方向相反。压力逐渐增大时 $f$ 也增大。

**流体阻力**：物体穿过液体或气体时受到的阻力，方向与速度方向相反，大小随速率变化，分三段：

| 速率范围 | 流态 | 阻力形式 |
|---|---|---|
| 速率不太大 | 层流，粘性为主 | $f=bv$ |
| 超过某限度（低于声速） | 出现旋涡 | $f=cv^{2}$ |
| 接近声速 | 激波等效应 | $f\propto v^{3}$ |

$f=bv$ 的情形可出现收尾速度。忽略浮力时，重力与阻力平衡后匀速下落，$mg=bv_m$。在液体中沉降若浮力不可忽略，应改用 $mg-F_{\text{浮}}=bv_m$。

## 2.3 基本的自然力（自学）

基本相互作用包括引力、电磁相互作用、强相互作用和弱相互作用。本节列为自学内容。

## 2.4 应用牛顿定律解题

### 2.4.1 通用步骤

1. **选研究对象**：先整体后隔离；涉及内部相互作用力时必须隔离。
2. **画受力图**：只画研究对象受到的力，不画它施于别人的力；每个力都要能说出施力者。
3. **定坐标与正方向**：直线运动取运动方向为正，圆周运动取切向、法向，斜面问题常取沿斜面/垂直斜面。
4. **列方程**：$\sum F_x=ma_x$、$\sum F_y=ma_y$（或 $F_\tau=ma_\tau$、$F_n=ma_n$）。
5. **解方程并讨论**：检查量纲、极限情形（$m\to0$、$\mu\to0$、$l\gg L$）是否合理。

连续体可按需要取微元列方程后积分。若所选系统有物质流入或流出，还必须计入动量通量；对固定的一整条链条或绳，系统总质量保持不变。

### 例 2.2 有质量的绳拉物体

光滑桌面上放质量 $M$ 的物体，一长 $L$、质量 $m$ 均匀分布的柔软细绳一端系在 $M$ 上，另一端施水平力 $F$，绳不可伸长。求 (1) 系统加速度与绳作用在 $M$ 上的力；(2) 绳上任意一点的张力。

![](/course-materials/campus-basic-physics/figures/02-02.png)

解：(1) 整体（$M$＋绳）沿水平方向只受 $F$：

$$
F=(M+m)a\ \Rightarrow\ a=\frac{F}{M+m}
$$

再隔离 $M$，水平方向只受绳的拉力 $T_0$（绳端对 $M$ 的力，与 $M$ 对绳的 $T_0'$ 是作用力与反作用力）：

$$
T_0=Ma=\frac{M}{M+m}F
$$

(2) 在距 $M$ 为 $x$ 处取小段 $\mathrm dx$，质量 $\mathrm dm=\dfrac{m}{L}\mathrm dx$，两端受力 $T_x$ 与 $T_x+\mathrm dT$。由牛顿第二定律

$$
(T_x+\mathrm dT)-T_x=\mathrm dm\,a\ \Rightarrow\ \mathrm dT=\frac{m}{L}\frac{F}{M+m}\mathrm dx
$$

对 $x$ 到 $L$ 积分（绳末端张力等于 $F$）：

$$
F-T_x=\frac{mF}{(M+m)L}(L-x)
$$

$$
T_x=\left(M+m\frac{x}{L}\right)\frac{F}{M+m}
$$

讨论：$x=0$ 时 $T_0=\dfrac{M}{M+m}F$，与 (1) 一致；$x=L$ 时 $T=F$。张力从物体端向施力端线性增大——这正是"有质量的绳各处张力不等"的定量体现。若 $m\to0$，则 $T_x\to F$，绳上张力处处相等。

**为什么不能整体求张力？** 因为张力是系统内力，整体法只能求加速度；求内力必须隔离。

### 例 2.3 链条滑下斜面

长 $L$、质量 $M$ 均匀分布的链条，开始时静止，一部分在水平面上，另一部分位于倾角 $\theta$ 的斜面上、长度为 $l$，其中 $0<l<L$。忽略摩擦和拐角处的能量损失。求 (1) 链条末端离开水平面时的速率；(2) 由开始到完全离开水平面所经历的时间。

![](/course-materials/campus-basic-physics/figures/02-03.png)

解：以斜面上的链长 $x$ 为位移变量，各链节沿路径的速率均为 $v=\mathrm dx/\mathrm dt$。沿各段的局部切向列方程并求和，理想张力项消去，重力沿路径的总驱动力为

$$
F=m_xg\sin\theta=\frac{M}{L}x\,g\sin\theta
$$

切向加速度 $a=\mathrm dv/\mathrm dt$ 满足

$$
\frac{M}{L}xg\sin\theta=Ma\ \Longrightarrow\ a=\frac{g\sin\theta}{L}x
$$

**(1) 补充解答**（课件缺此步）：$a$ 随 $x$ 变化，不能套匀加速公式。用 $a=v\dfrac{\mathrm dv}{\mathrm dx}$：

$$
\begin{aligned}
v\frac{\mathrm dv}{\mathrm dx}&=\frac{g\sin\theta}{L}x\\
\Longrightarrow\quad
\int_{0}^{v}v'\,\mathrm dv'
&=\frac{g\sin\theta}{L}\int_{l}^{x}x'\,\mathrm dx'
\end{aligned}
$$

$$
v^{2}=\frac{g\sin\theta}{L}\left(x^{2}-l^{2}\right)
$$

$$
v(x)=\sqrt{\frac{g\sin\theta}{L}\left(x^{2}-l^{2}\right)}
$$

链条末端离开水平面时 $x=L$：

$$
v=\sqrt{\frac{g\sin\theta}{L}\left(L^{2}-l^{2}\right)}
$$

(2) 由 $v=\dfrac{\mathrm dx}{\mathrm dt}$ 分离变量：

$$
\frac{\mathrm dx}{\sqrt{x^{2}-l^{2}}}=\sqrt{\frac{g\sin\theta}{L}}\,\mathrm dt
$$

$$
\int_{l}^{L}\frac{\mathrm dx}{\sqrt{x^{2}-l^{2}}}=\sqrt{\frac{g\sin\theta}{L}}\int_{0}^{t}\mathrm dt
$$

左边积分给出 $\ln\dfrac{L+\sqrt{L^{2}-l^{2}}}{l}$，故

$$
t=\sqrt{\frac{L}{g\sin\theta}}\ln\frac{L+\sqrt{L^{2}-l^{2}}}{l}
$$

整条链条的质量 $M$ 保持不变，变化的是斜面段的质量及其重力驱动作用。加速度随位置变化，可用 $a=v\,\mathrm dv/\mathrm dx$ 或能量方法求解。

### 例 2.4 圆环内壁的摩擦减速

质量 $m$ 的物体在光滑桌面上紧贴半径 $R$ 的圆环内壁运动，初速 $v_0$，物体与环内壁的摩擦系数 $\mu_r$。求运动一周回到出发点时的速率。

![](/course-materials/campus-basic-physics/figures/02-04.png)

解：内壁的正压力就是物体作圆周运动的向心力，它随速率减小而减小；切向摩擦力产生负的切向加速度。

法向：

$$
F_n=ma_n=m\frac{v^{2}}{R}
$$

切向（摩擦力大小 $f=\mu_rN=\mu_rF_n$，方向与 $\vec v$ 相反）：

$$
F_\tau=ma_\tau=-\mu_rN=-\mu_rF_n
$$

$$
\boxed{\ ma_\tau=-\mu_r m\frac{v^{2}}{R}\ }
$$

又 $a_\tau=\dfrac{\mathrm dv}{\mathrm dt}=\dfrac{\mathrm dv}{\mathrm ds}\dfrac{\mathrm ds}{\mathrm dt}=v\dfrac{\mathrm dv}{\mathrm ds}$，代入得

$$
mv\frac{\mathrm dv}{\mathrm ds}=-\mu_r\frac{mv^{2}}{R}\ \Longrightarrow\ \frac{\mathrm dv}{v}=-\frac{\mu_r}{R}\mathrm ds
$$

$$
\int_{v_0}^{v}\frac{\mathrm dv}{v}=\int_{0}^{s}-\frac{\mu_r}{R}\mathrm ds
$$

$$
v=v_0e^{-\frac{\mu_r}{R}s}
$$

一周 $s=2\pi R$：

$$
v=v_0e^{-2\pi\mu_r}
$$

要点：摩擦系数 $\mu_r$ 与路径长度无关，但因为 $N$ 依赖 $v^{2}$，阻力不是常量，速率按指数衰减——这与"恒定摩擦力"给出的线性减速完全不同。指数里没有 $R$ 单独出现，说明结果只取决于绕过的角度。

## 本章要点

- 牛顿三定律是一个整体：第一定律界定惯性系，第二定律给出定量关系，第三定律保证内力成对、系统内力可抵消。
- 第二定律的原始形式是 $\vec F=\mathrm d\vec p/\mathrm dt$，$F=ma$ 只在 $v\ll c$、质量不变时成立。
- 列方程前必须先画受力图并明确正方向；曲线运动一律拆成切向、法向两式。
- 作用力与反作用力作用在不同物体上，不能与平衡力混淆。
- 万有引力只对质点直接成立，连续体必须取微元积分；$l\gg L$ 时退化检验是必备步骤。
- 轻绳的张力关系要结合沿绳分布力和滑轮条件判断；有质量绳上的张力可按微元列式求解。
- 加速度随位置变化时，可用 $a=v\,\mathrm dv/\mathrm dx$ 或能量法。固定整条链条为系统时总质量不变。
