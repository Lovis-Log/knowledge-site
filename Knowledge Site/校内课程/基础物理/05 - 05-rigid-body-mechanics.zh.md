---
slug: "05-rigid-body-mechanics"
title: "刚体力学"
summary: "刚体定轴转动、转动惯量、角动量与转动能量。"
updatedAt: "2026-11-19"
content_type: "reference"
group: "course"
displayNumber: "05"
tags: ["基础物理"]
sources: [{"kind": "article", "title": "第5章 1~4节-刚体运动学 刚体定轴转动定律.pdf", "url": "https://drive.google.com/file/d/1I7jqe8ZSVzmeDXIl41Ooa9NF_reHhvLN/view?usp=drivesdk"}, {"kind": "article", "title": "第5章5&6节- 角动量守恒定律 转动中的功和能.pdf", "url": "https://drive.google.com/file/d/1AzXvjOBRLOzTWUHw-rQ5t4Wdvj3jyLbo/view?usp=drivesdk"}]
---

本章把质点力学搬到"有大小、形状不变的物体"上。主线只有一条：先用角量描述定轴转动，再由质点牛顿定律推出转动定律 $M=J\alpha$，然后把动量、功和能的一套结论逐一对应到转动情形。学完应能独立处理"滑轮有质量""杆下摆""子弹嵌入"三类问题。

约定：本章所有定轴转动问题，先取转轴为正方向轴，角速度、角加速度、力矩都按同一右手螺旋方向取正负号。逆着正方向的一律带负号，不再另设符号。

## 5.1 刚体转动的描述

### 5.1.1 刚体模型

刚体是任何情况下形状和大小都不发生变化的物体。等价的说法是：刚体内任意两质元之间的距离始终保持不变。

$$
\left|\Delta \vec r_{ij}\right|=\text{常量}
$$

它是继质点之后另一类理想模型：物体的大小形状不能忽略，但大小和形状不变。因此刚体不是"一个点"，而是"各质元相对位置被锁死的一群点"。

### 5.1.2 平动

平动：刚体内任意两点间连线的空间取向在运动过程中始终保持不变。

$$
\Delta \vec r_{ij}=\vec c=\text{恒矢量}
$$

由 $\vec r_j=\vec r_i+\Delta\vec r_{ij}$ 对时间求导，注意 $\vec c$ 是恒矢量：

$$
\vec v_j=\vec v_i,\qquad \vec a_j=\vec a_i
$$

结论：刚体平动时，其上各点具有相同的速度、加速度和相同的运动轨迹。所以任取一点的运动规律即可代表整个刚体，通常取质心，按质点处理。

> 注意"轨迹相同"指形状相同，不是空间位置相同；各点轨迹是彼此平移的曲线（例如车轮外缘上一点与轮心，轨迹差一个常矢量）。

### 5.1.3 转动与定轴转动

转动：刚体上所有质元都绕同一直线作圆周运动，该直线称为转轴。当转轴固定不动时，称为定轴转动。

刚体的一般运动可以分解为：刚体上任一点的位移，总可以表示为一个随质心的平动加上绕质心的转动（蔡斯勒斯定理）。这解释了为什么车轮滚动可以看成"轮心平动 + 绕轮心转动"的叠加。

定轴转动的两个特征：

1. 各质点都在垂直于转轴的不同平面内作圆周运动；
2. 各质元作圆周运动的半径在相同时间内转过的角度相同。

推论：所有质元具有相同的角位移、角速度和角加速度。这正是定轴转动可以用一组角量统一描述的原因——线量 $v,a$ 随半径变，角量 $\theta,\omega,\alpha$ 不分半径。

### 5.1.4 角速度与角加速度

角速度矢量的大小为

$$
|\vec\omega|=\omega=\frac{d\theta}{dt}
$$

方向平行于转轴，与转动方向成右手螺旋关系时为正，反之为负。

![](/course-materials/campus-basic-physics/figures/05-01.png)

图中 $\vec\omega$ 沿轴向上，四指由 $\vec r_i$ 转向 $\vec v_i$ 的方向即转动方向；质元 $\Delta m_i$ 的线速度 $\vec v_i=\vec\omega\times\vec r_i$，大小 $v_i=r_i\omega$，方向切于圆周。

角加速度矢量为

$$
\vec\alpha=\frac{d\vec\omega}{dt}
$$

方向也平行于转轴；$\omega$ 增大时取正值，反之取负值。定轴情形下 $\vec\omega$ 与 $\vec\alpha$ 共线，$\alpha=d\omega/dt=d^2\theta/dt^2$，不必再作矢量运算。

定轴转动的运动学与质点直线运动完全同构：

| 平动 | 定轴转动 |
|---|---|
| $x$ | $\theta$ |
| $v=dx/dt$ | $\omega=d\theta/dt$ |
| $a=dv/dt$ | $\alpha=d\omega/dt$ |
| $v=v_0+at$ | $\omega=\omega_0+\alpha t$ |
| $x=x_0+v_0t+\frac12at^2$ | $\theta=\theta_0+\omega_0t+\frac12\alpha t^2$ |

最后一行的匀变速公式只在 $\alpha$ 为常量时成立。

## 5.2 转动定律

### 5.2.1 刚体受到的力矩

设外力 $\vec F$ 作用在转动平面内，$\vec F$ 对转轴的力矩为

$$
\vec M=\vec r\times\vec F
$$

其中 $\vec r$ 是转动平面与转轴的交点 $o$ 指向力的作用点的矢量。大小为

$$
M=rF\sin\alpha=rF_t
$$

$\alpha$ 是 $\vec r$ 与 $\vec F$ 的夹角，$F_t$ 是 $\vec F$ 在切向的分量。方向沿转轴 $oo'$，由右手螺旋定则判定。

若外力不在转动平面内，取轴上的同一参考点，用 $\vec r_i$ 表示从该点到作用点的位矢。绕 $z$ 轴的运动由力矩在轴上的投影决定。设 $r_{i\perp}$ 是作用点到轴的距离，$F_{it}$ 是按右手定则规定正方向的切向力分量。

$$
M_{iz}=(\vec r_i\times\vec F_i)_z=r_{i\perp}F_{it}
$$

刚体同时受几个力矩时，总力矩为矢量和

$$
\vec M=\vec M_1+\vec M_2+\cdots+\vec M_n
$$

轴向分力可能产生垂直于轴的力矩。轴承提供维持定轴运动所需的约束，垂直分量仍可能参与横向角动量的变化。求绕轴的角加速度时只取合外力矩的轴向投影。

$$
M=\sum_i M_i=\sum_i r_iF_{it}
$$

这就是后面所有方程里"外力矩"的含义：**对同一转轴、带正负号的代数和**。投影时先定轴的正方向，再按右手螺旋判每个力矩的正负，不要凭"顺时针为正"之类的直觉。

### 5.2.2 角动量与转动惯量

下文以 $r_i$ 表示质元 $\Delta m_i$ 到轴的垂直距离。质元角动量在轴上的带符号投影为

$$
L_i=m_ir_iv_i=m_ir_i^2\omega
$$

因为质元沿圆周运动，其带符号切向速度为 $r_i\omega$。整个刚体的角动量在 $z$ 轴上的投影为

$$
L_z=\sum_i L_i=\left(\sum_i m_ir_i^2\right)\omega
$$

当转轴一定，$\sum_i m_ir_i^2$ 是不变量。定义

$$
J=\sum_i m_ir_i^2
$$

为刚体对该转轴的转动惯量，则

$$
L=J\omega
$$

转动惯量在转动中的地位，相当于质量在平动中的地位：它衡量"改变转动状态有多难"。

### 5.2.3 转动定律的推导

对刚体上第 $i$ 个质元，受外力 $\vec F_i$ 和其他质元的合力（内力）$\vec f_i$：

$$
\vec F_i+\vec f_i=m_i\vec a_i
$$

分解到切向和法向。法向力只提供法向加速度、改变速度方向，对绕轴转动不起作用；切向分量给出

$$
F_{it}+f_{it}=m_ia_{it}=m_ir_i\alpha
$$

两边乘以 $r_i$ 并对所有质元求和：

$$
\sum_i r_iF_{it}+\sum_i r_if_{it}=\alpha\sum_i m_ir_i^2
$$

关键一步：内力总是成对出现，每一对作用力与反作用力大小相等、方向相反、作用线相同，对同一转轴的力臂相同而转向相反，力矩代数和为零，因此

$$
\sum_i r_if_{it}=0
$$

而 $\sum_i r_iF_{it}$ 正是合外力矩 $M$，$\sum_i m_ir_i^2$ 正是 $J$。于是

$$
M=J\alpha
$$

这就是刚体定轴转动定律。

### 5.2.4 对转动定律的讨论

定轴刚体的轴向关系为

$$
M=\frac{dL}{dt}=J\frac{d\omega}{dt}=J\alpha
$$

若质量分布随时间变化，角动量定理仍写成 $M_z=\mathrm dL_z/\mathrm dt$。当系统各部分仍以共同角速度绕同一轴转动时，$L_z=J\omega$，此时应对整个乘积求导。

必须注意：**$M$ 和 $J$ 是相对同一转轴而言的**。换轴必须同时重算两者，不能拿绕质心的 $J$ 去配绕端点的外力矩。

与牛顿第二定律对照：

$$
M_z=J\alpha_z\quad\longleftrightarrow\quad F_x=ma_x
$$

正向轴力矩产生正向角加速度。$J$ 在轴向转动方程中对应平动方程里的 $m$。轴向力矩一定时，

$$
\alpha\propto\frac{1}{J}
$$

转动惯量表示刚体转动惯性的大小：同样的力矩，$J$ 越大，角加速度越小，转动状态越难改变。

## 5.3 转动惯量的计算

### 5.3.1 定义与三个要素

转动惯量 $J$ 取决于三个因素：

1. 质量的大小；
2. 质量的分布（离轴越远贡献越大，因为是 $r^2$）；
3. 转轴的位置。

分立质点组：

$$
J=\sum_i m_ir_i^2
$$

质量连续分布时，取质元 $dm$，有 $dJ=r^2dm$，

$$
J=\int r^2dm
$$

按质量分布的类型，$dm$ 可写成 $\lambda dl$（线）、$\sigma dS$（面）、$\rho dV$（体），$r$ 一律是质元到转轴的垂直距离。

### 5.3.2 例：均匀细棒的转动惯量

例：已知均匀细棒长为 $l$、质量为 $m$。分别求其对以下两个转轴的转动惯量：① 转轴过棒中心 $o$ 并与棒垂直；② 转轴过棒的一端 $A$ 并与棒垂直。

解：将棒分割成许多质元 $dm$，取 $o$ 为原点、沿棒为 $x$ 轴，则

$$
dm=\lambda dx,\qquad \lambda=\frac{m}{l}
$$

![](/course-materials/campus-basic-physics/figures/05-02.png)

对 $o$ 轴，质元到轴的距离 $r=x$，积分限 $-l/2\to l/2$：

$$
J_o=\int r^2dm=\int_{-l/2}^{l/2}x^2\lambda dx=\frac{1}{12}ml^2
$$

对 $A$ 轴，$A$ 在 $x=-l/2$ 处，质元到轴的距离 $r=l/2+x$：

$$
J_A=\int_{-l/2}^{l/2}\left(\frac{l}{2}+x\right)^2\lambda dx=\frac{1}{3}ml^2
$$

两个结果的关系值得单独看：

$$
J_A=\frac{1}{3}ml^2=\frac{1}{12}ml^2+m\left(\frac{l}{2}\right)^2=J_o+m\,\overline{oA}^2
$$

这正是平行轴定理的一个实例。

### 5.3.3 平行轴定理

若轴 $A$ 与过质心的轴 $C$ 平行，则刚体对轴 $A$ 的转动惯量为

$$
J_A=J_C+md^2
$$

$d$ 为两轴间的距离，$m$ 为刚体总质量。

适用条件必须记清：两轴**平行**，且其中一条**过质心**。定理只能从质心轴出发加到任意平行轴，不能从任意轴出发加到另一条任意轴。

### 5.3.4 例：细圆环与圆盘

例：细圆环半径为 $R$，质量 $m$ 均匀分布，求其对过质心并垂直于环面的转轴的转动惯量。

解：环上所有质元到轴的距离都等于 $R$，$dm=\lambda dl$：

$$
J=\int_L R^2dm=R^2\int_L dm=mR^2
$$

例：求半径 $R$、质量 $m$ 均匀分布的圆盘对通过质心并与盘面垂直的转轴的转动惯量。

解：将圆盘分成许多圆环。半径 $r$ 处宽 $dr$ 的圆环质量为

$$
dm=\sigma\,ds=\sigma\,2\pi r\,dr,\qquad \sigma=\frac{m}{\pi R^2}
$$

于是

$$
dJ=r^2dm=\sigma 2\pi r^3dr
$$

$$
J=\int_0^R\sigma 2\pi r^3dr=\frac{1}{2}mR^2
$$

圆环绕轴 $J=mR^2$、圆盘 $J=\frac12mR^2$ 这两个结果是后面最常用的，可直接引用；区别就在质量是否全部集中在同一半径上。

### 5.3.5 例：杆与嵌入子弹

例：长为 $l$、质量为 $M$ 的杆绕过端点的垂直轴 $o$ 转动，子弹 $m$ 从距离轴 $d$ 处打入，求系统对该轴的转动惯量。

解：子弹可视为质点，嵌入后到轴距离固定为 $d$：

$$
J_{\text{总}}=J_{\text{杆}}+J_{\text{子弹}}=\frac{1}{3}Ml^2+md^2
$$

这里用的是"转动惯量可加"：几部分对同一轴的转动惯量直接相加。若子弹射入位置改变，$d$ 变，$J$ 也变——但碰撞瞬间 $d$ 是确定的。

### 5.3.6 回转半径

在一些转动问题中，可将刚体的质量等价于集中在离轴为 $r_G$ 的圆环上，使

$$
J=\sum_i\Delta m_ir_i^2=mr_G^2
$$

$r_G$ 称为刚体对该定轴的回转半径：

$$
r_G=\sqrt{\frac{J}{m}}
$$

它把"质量分布得有多开"压缩成一个等效半径，便于比较不同形状。

## 5.4 转动定律的应用

### 例 5.1 变力矩驱动的滑轮

例：半径为 $R$、质量 $m$ 均匀分布的静止滑轮，受力作用开始绕中心轴 $o$ 转动，设力 $F=kt$，求任一时刻的角速度。

解：力沿轮缘切向，力矩

$$
M=FR=kRt
$$

由转动定律

$$
M=J\alpha=J\frac{d\omega}{dt},\qquad J=\frac{1}{2}mR^2
$$

分离变量：

$$
kRt\,dt=J\,d\omega
$$

$$
\int_0^\omega d\omega=\int_0^t\frac{kRt}{J}dt=\frac{2k}{mR}\int_0^t t\,dt
$$

$$
\omega(t)=\frac{k}{mR}t^2
$$

要点：力矩随时间变时不能直接用匀角加速公式，必须写成微分方程再积分。

### 例 5.2 恒定力矩与正比于角速度的阻力矩

例：转动惯量为 $J$ 的静止刚体受力矩 $M_0$ 作用开始转动，同时产生阻力矩 $M_1$，已知 $\vec M_1=-k\vec\omega$，求角速度随时间的变化关系。

解：设转轴正方向向左（与 $\vec M_0$ 同向），由转动定律

$$
M_0+M_1=J\alpha
$$

代入 $M_1=-k\omega$：

$$
\alpha=\frac{M_0-k\omega}{J},\qquad \frac{d\omega}{dt}=\frac{M_0-k\omega}{J}
$$

分离变量并积分：

$$
\int_0^\omega\frac{d\omega}{M_0-k\omega}=\int_0^t\frac{dt}{J}
$$

$$
\omega=\frac{M_0}{k}\left(1-e^{-kt/J}\right)
$$

结果说明：$t\to\infty$ 时 $\omega\to M_0/k$，驱动力矩与阻力矩平衡，进入匀速转动。

### 例 5.3 有质量滑轮的阿特伍德机

例：质量为 $m$、半径为 $r$ 的均质滑轮两端用轻绳挂有质量分别为 $m_1$ 和 $m_2$ 的物体。求两物体的加速度以及绳中的张力 $T_1$、$T_2$。

![](/course-materials/campus-basic-physics/figures/05-03.png)

解：设 $m_1$ 向下、$m_2$ 向上，滑轮按图示方向转动，角加速度为 $\alpha$。绳与轮之间不打滑，故

$$
a_1=a_2=a=r\alpha
$$

分别对两物体和滑轮列方程：

$$
\begin{cases}
m_1g-T_1'=m_1a_1\\
T_2'-m_2g=m_2a_2\\
T_1r-T_2r=J\alpha
\end{cases}
\qquad
\begin{cases}
T_1'=T_1\\
T_2'=T_2
\end{cases}
$$

$$
J=\frac{1}{2}mr^2
$$

联立解得

$$
a_1=a_2=\frac{(m_1-m_2)g}{m_1+m_2+m/2}
$$

$$
T_1=\frac{2m_1m_2g+m_1mg/2}{m_1+m_2+m/2},\qquad
T_2=\frac{2m_1m_2g+m_2mg/2}{m_1+m_2+m/2}
$$

分析：滑轮两端张力**不相等**，差值 $T_1-T_2$ 正是使滑轮转动的力矩来源。当忽略滑轮质量（$m\to0$）时，

$$
T_1=T_2=\frac{2m_1m_2g}{m_1+m_2}
$$

回到理想的"轻绳轻滑轮"结果。

为什么这样列方程：研究对象分成三个——$m_1$、$m_2$、滑轮。绳轻且不打滑，所以同一根绳上张力大小相等，但**跨过有质量滑轮时两侧是两段不同的绳**，张力可以不同；正是这个差值提供力矩。选择 $m_1$ 向下为正，则滑轮转向与之匹配，$a=r\alpha$ 才取正号。

### 例 5.4 双定滑轮系统

例：两半径为 $r$ 的定滑轮绕中心轴的转动惯量均为 $J$，质量为 $m_1$ 和 $m_2$ 的两重物用轻绳连接并跨过两滑轮，由静止释放。设 $m_1>m_2$，求绳各部分的张力及物体的加速度。

解：整体沿顺时针方向运动，设加速度为 $a$。受力分析列方程：

$$
\begin{cases}
m_1g-T_1=m_1a\\
T_2-m_2g=m_2a\\
T_1'r-Tr=J\alpha\\
T'r-T_2'r=J\alpha
\end{cases}
\qquad
\begin{cases}
T_1=T_1'\\
T_2=T_2'\\
T=T'\\
a=r\alpha
\end{cases}
$$

解上述方程得

$$
a=\frac{(m_1-m_2)gr^2}{2J+(m_1+m_2)r^2}
$$

$$
T_1=T_1'=\frac{2(J+m_2r^2)}{2J+(m_1+m_2)r^2}m_1g
$$

$$
T_2=T_2'=\frac{2(J+m_1r^2)}{2J+(m_1+m_2)r^2}m_2g
$$

$$
T=T'=\frac{J(m_1+m_2)+2m_1m_2r^2}{2J+(m_1+m_2)r^2}g
$$

两滑轮各受一个力矩，转向相同，所以两个转动方程相加后 $T$ 消去，只剩 $T_1'-T_2'$ 与 $2J\alpha$ 平衡。水平段绳的张力 $T$ 与两侧张力都不同，这是"每个轮子各有摩擦力矩来源"的直接结果。

## 5.5 角动量守恒

### 5.5.1 刚体定轴转动的角动量定理

由 $M=dL/dt$ 得

$$
M\,dt=dL=J\,d\omega
$$

$M\,dt$ 称为冲量矩，与平动的冲量 $F\,dt$ 对应。设 $t_1\to t_2$ 内 $\omega$ 由 $\omega_1$ 变到 $\omega_2$，积分：

$$
\int_{t_1}^{t_2}M\,dt=\int_{L_1}^{L_2}dL=L_2-L_1=J\omega_2-J\omega_1
$$

即

$$
\int_{t_1}^{t_2}M\,dt=J\omega_2-J\omega_1
$$

刚体所受的冲量矩等于刚体角动量的增量。冲量矩是引起刚体角动量改变的原因。

对一个系统（可含多个刚体或质点）：

$$
\sum_i M_{i\text{外}}\,dt=d\sum_i L_i=d\sum_i J_i\omega_i
$$

只有外力矩出现在求和号内，内力矩成对抵消。

### 5.5.2 角动量守恒定律

若对所选轴

$$
\sum_i M_{i\text{外}}=0
$$

则

$$
d\sum_iL_i=d\sum_iJ_i\omega_i=0
$$

即

$$
L=\sum_iL_i=\sum_iJ_i\omega_i=\text{恒量}
$$

角动量守恒。

角动量守恒定律对非刚体也成立。$J$ 可变时，一般有三种表现：

- $J$、$\omega$ 均不变，保持匀速转动；
- $J$ 变，则 $\omega$ 也变（$J$ 减小则 $\omega$ 增大）；
- 不同部分产生反向转动，但总角动量保持不变。

**轴的选取。** 守恒式 $L=\sum J_i\omega_i$ 是对某一根轴写的，用之前必须先明确这根轴：

1. 选惯性系中的固定轴，或选过运动质心且方向在惯性系中保持不变的轴。若轴的方向转动，求投影对时间的导数时还要计入轴方向的变化。
2. 外力矩和角动量必须对同一根轴计算，中途不能换轴；换轴要同时重算 $M$ 和 $L$。
3. 只在"对这根轴 $\sum M_{\text{外}}=0$"时才能说守恒；对另一根轴未必成立。碰撞类问题常选过悬点（或质心）且垂直于运动平面的轴，因为轴的约束力过该点、力臂为零。

花样滑冰运动员收臂加速旋转、跳水运动员抱膝翻转、直升机尾桨抵消机身反转，都是同一件事：无外力矩时 $J\omega$ 守恒，改变质量分布就能改变转速。

### 例 5.5 转台上奔跑的人

例：质量为 $m$ 的人站在一质量 $M$、半径 $R$ 的转台边缘，初始时两者均静止。问当人沿转台边缘奔跑一周时，人和转台各对地转过了多少角度？

解：以人和转台为系统。竖直轴方向的外力矩为零（重力、支持力、轴承力都平行于轴或过轴），故系统角动量守恒。任一时刻

$$
J_m\vec\omega_m+J_M\vec\omega_M=0
$$

$$
J_m=mR^2,\qquad J_M=\frac{1}{2}MR^2
$$

这里 $\vec\omega_m$ 是人对地的角速度，$\vec\omega_M$ 是转台对地的角速度。设 $\vec\omega_m'$ 为人相对转台的角速度，则

$$
\vec\omega_m=\vec\omega_m'+\vec\omega_M
$$

代入守恒式：

$$
mR^2(\omega_m'+\omega_M)+\frac{1}{2}MR^2\omega_M=0
$$

由此得

$$
\omega_m'=-\left(1+\frac{M}{2m}\right)\omega_M,\qquad
\omega_m=-\frac{M}{2m}\omega_M
$$

两式分别对时间积分。人相对转台跑完一周，$\int_0^t\omega_m'\,dt=2\pi$：

$$
2\pi=-\left(1+\frac{M}{2m}\right)\theta_M
$$

$$
\theta_m=-\frac{M}{2m}\theta_M
$$

联立得

$$
\theta_m=\frac{2\pi M}{M+2m},\qquad
\theta_M=-\frac{4\pi m}{M+2m}
$$

负号表示转台沿与人奔跑相反的方向转过角度 $|\theta_M|$。

为什么这样取系统：人—台之间有摩擦力，是内力，不改变总角动量；外力（重力、轴的支持力）对竖直轴无力矩。若只看人，摩擦力矩是外力矩，角动量不守恒；所以必须把人和台放在一个系统里。另一个易错点是"跑完一周"是**相对转台**一周，不是对地一周，因此积分 $\omega_m'$ 而不是 $\omega_m$。

## 5.6 转动中的功和能

### 5.6.1 力矩的功

设质元 $\Delta m_i$ 受一垂直于转轴平面的力 $\vec F$ 作用，产生角位移 $d\theta$，质元走过的弧长 $ds=r\,d\theta$。力做的元功

$$
dA=F_t\,ds=F\sin\varphi\cdot r\,d\theta
$$

其中 $F\sin\varphi=F_t$ 是切向分量，而 $rF\sin\varphi=M$，所以

$$
dA=M\,d\theta
$$

当 $\theta$ 由 $\theta_1$ 变到 $\theta_2$，力矩的功

$$
A=\int dA=\int_{\theta_1}^{\theta_2}M\,d\theta
$$

$M$ 是沿轴的有符号分量；$M$ 与 $d\theta$ 同号时做正功，异号时做负功。这与平动的 $A=\int F_t\,ds$ 完全对应。

### 5.6.2 转动动能与动能定理

对转动质元

$$
E_{ki}=\frac{1}{2}\Delta m_iv_i^2=\frac{1}{2}\Delta m_ir_i^2\omega^2
$$

总转动动能

$$
E_k=\sum_iE_{ki}=\frac{1}{2}\left(\sum_i\Delta m_ir_i^2\right)\omega^2=\frac{1}{2}J\omega^2
$$

由 $dA=M\,d\theta=J\alpha\,d\theta=J\frac{d\omega}{dt}d\theta=J\omega\,d\omega$，积分得

$$
A=\int_{\theta_1}^{\theta_2}M\,d\theta=\int_{\omega_1}^{\omega_2}J\omega\,d\omega
=\frac{1}{2}J\omega_2^2-\frac{1}{2}J\omega_1^2=E_{k2}-E_{k1}
$$

即刚体定轴转动的动能定理：

$$
\int_{\theta_1}^{\theta_2}M\,d\theta=\frac{1}{2}J\omega_2^2-\frac{1}{2}J\omega_1^2
$$

合外力矩的功等于刚体转动动能的增量。

刚体的平动动能：

$$
E_{k\text{平}}=\sum_{i=1}^n\frac{1}{2}\Delta m_iv_i^2=\frac{1}{2}mv_C^2
$$

$v_C$ 为质心速度。即研究平动问题时可将质量全部集中在质心，按质点处理。

### 5.6.3 刚体的重力势能与机械能

对任一质元 $\Delta m_i$，重力势能 $E_{pi}=\Delta m_i gz_i$。对整个刚体

$$
E_p=\sum_iE_{pi}=\sum_i\Delta m_igz_i=mg\frac{\sum_i\Delta m_iz_i}{m}=mgz_C
$$

$z_C$ 是质心的高度。**刚体的重力势能等于全部质量集中于质心时的势能**，这是"重力作用在质心"的定量表达。

一般平面运动的机械能：

$$
E_{\text{机械}}=E_p+E_{k\text{平动}}+E_{k\text{转动}}
$$

$$
E_{\text{机械}}=mgh_C+\frac{1}{2}mv_C^2+\frac{1}{2}J\omega^2
$$

绕质心转动时 $J$ 取绕质心的值；若刚体绕固定轴转动且质心不动，则 $v_C=0$，只剩 $\frac12J\omega^2$（此时 $J$ 取绕该固定轴的值）。

### 例 5.6 细杆从水平位置下摆（三种解法）

例：质量为 $m$ 的均质细杆长为 $l$，可绕过一端的 $O$ 轴转动。设杆自水平静止释放，求杆与水平方向成 $\theta$ 角时的角速度和角加速度。

![细杆下摆](/course-materials/campus-basic-physics/figures/05-04.png)

**解法 1：用转动定律。**

重力矩（重力作用在质心，力臂为 $\frac{l}{2}\cos\theta$）：

$$
M=mg\frac{l}{2}\cos\theta
$$

$$
J=\frac{1}{3}ml^2
$$

由 $M=J\alpha$：

$$
\alpha=\frac{M}{J}=\frac{3g}{2l}\cos\theta
$$

再由 $\alpha=\frac{d\omega}{dt}=\omega\frac{d\omega}{d\theta}$ 分离变量：

$$
\omega\,d\omega=\frac{3g}{2l}\cos\theta\,d\theta
$$

$$
\int_0^\omega\omega\,d\omega=\int_0^\theta\frac{3g}{2l}\cos\theta\,d\theta
$$

$$
\frac{1}{2}\omega^2=\frac{3g}{2l}\sin\theta,\qquad
\omega=\sqrt{\frac{3g}{l}\sin\theta}
$$

**解法 2：用动能定理。**

重力矩的功

$$
A_p=\int_0^\theta M\,d\theta=\int_0^\theta\frac{mgl}{2}\cos\theta\,d\theta=\frac{mgl}{2}\sin\theta
$$

动能增量 $\Delta E_k=\frac12J\omega^2-0$。由 $A_p=\Delta E_k$：

$$
\frac{mgl}{2}\sin\theta=\frac{1}{2}J\omega^2
$$

代入 $J=\frac13ml^2$，同样得 $\omega=\sqrt{\frac{3g}{l}\sin\theta}$。

**解法 3：用机械能守恒。**

以杆和地球为系统，转动过程中只有重力（保守内力）做功。取初始水平位置为势能零点，则初态 $E_1=0$；处于 $\theta$ 角时质心下降 $\frac{l}{2}\sin\theta$：

$$
E_2=\frac{1}{2}J\omega^2-mg\frac{l}{2}\sin\theta
$$

令 $E_1=E_2$ 得同一结果。再由 $\omega^2=\frac{3g}{l}\sin\theta$ 对时间求导：

$$
2\omega\frac{d\omega}{dt}=\frac{3g}{l}\cos\theta\cdot\frac{d\theta}{dt}
$$

$$
2\omega\alpha=\frac{3g}{l}\omega\cos\theta,\qquad
\alpha=\frac{3g}{2l}\cos\theta
$$

三种解法对比：求角加速度用转动定律最直接；求角速度用动能定理或机械能守恒都可以，机械能守恒更省去积分。机械能守恒的前提是"只有保守力做功"，轴的反作用力过轴、不做功，所以成立。

### 例 5.7 子弹嵌入悬杆：角动量、动量与能量

例：质量 $M$、长 $l$ 的杆开始竖直悬挂且静止。现有质量 $m$ 的子弹以水平初速 $v_0$ 从距悬点下端 $b$ 处射入杆中，求：(1) 子弹刚嵌入时杆的角动量与角速度；(2) 子弹嵌入前后系统动量的改变；(3) 嵌入前后能量的改变。

解 (1)：碰撞瞬间，轴 $O$ 处有约束力，但其作用线过轴，对 $O$ 的力矩为零；重力矩在极短碰撞时间内冲量矩可忽略。故系统对 $O$ 轴角动量守恒：

$$
L_1=L_2
$$

$$
L_1=mv_0b
$$

$$
L_2=(J_m+J_M)\omega=\left(mb^2+\frac{1}{3}Ml^2\right)\omega
$$

$$
mv_0b=\left(mb^2+\frac{1}{3}Ml^2\right)\omega
$$

$$
\omega=\frac{3mv_0b}{3mb^2+Ml^2}
$$

角动量 $L_2=L_1=mv_0b$，即嵌入过程角动量不变。

解 (2)：嵌入前系统动量只有子弹贡献：

$$
p_1=p_{m_1}+p_{M_1}=mv_0+0=mv_0
$$

嵌入后，子弹速度 $v_m=b\omega$，杆的质心速度 $v_M=\frac{l}{2}\omega$：

$$
p_{m_2}=mb\omega=\frac{3m^2b^2v_0}{3mb^2+Ml^2}
$$

$$
p_{M_2}=M\frac{l}{2}\omega=\frac{3mMblv_0}{2(3mb^2+Ml^2)}
$$

$$
p_2=p_{m_2}+p_{M_2}=\frac{3b(Ml+2mb)}{2(3mb^2+Ml^2)}p_1
$$

$$
\Delta p=p_2-p_1=\frac{(3b-2l)Ml}{2(3mb^2+Ml^2)}p_1
$$

$$
\Delta p
\begin{cases}
<0, & b<2l/3\\
>0, & b>2l/3
\end{cases}
$$

动量不守恒，因为轴在碰撞瞬间对杆施加了水平冲量。这个冲量的大小与符号取决于撞击点高度：打在 $2l/3$ 以上，轴要"拉住"杆；打在以下，轴要"推"杆。角动量守恒只要求外力矩为零，不要求外力为零，这正是两者的区别。

解 (3)：嵌入前

$$
E_1=\frac{1}{2}mv_0^2
$$

嵌入后

$$
E_2=\frac{1}{2}J_m\omega^2+\frac{1}{2}J_M\omega^2
=\frac{1}{2}\left(mb^2+\frac{1}{3}Ml^2\right)\omega^2
$$

代入 $\omega$：

$$
E_2=\frac{3mb^2}{3mb^2+Ml^2}\cdot\frac{1}{2}mv_0^2
=\frac{3mb^2}{3mb^2+Ml^2}E_1
$$

$$
\Delta E=E_2-E_1=-\frac{Ml^2}{3mb^2+Ml^2}E_1<0
$$

能量损失，属于完全非弹性碰撞：子弹嵌入杆内，二者最后同角速度，相对运动被摩擦内力耗散。

### 例 5.8 小球与细棒的弹性碰撞

例：质量为 $M$、长 $2l$ 的均质细棒，可绕过中点的水平轴转动，起始静止于水平位置。一质量为 $m$ 的小球以速度 $v_0$ 垂直落到棒的端点并与之发生弹性碰撞。求碰后棒的角速度、小球回跳的速度和碰后静止的条件。

解：碰撞瞬间轴的反作用力过轴，对 $O$ 的力矩为零，系统对 $O$ 轴角动量守恒；弹性碰撞又保证机械能守恒。取小球初速方向为角动量正方向，碰后小球以 $v$ 反向弹回，则其角动量为 $-mvl$：

$$
mv_0l=J\omega-mvl
$$

$$
\frac{1}{2}mv_0^2=\frac{1}{2}mv^2+\frac{1}{2}J\omega^2
$$

$$
J=\frac{1}{12}M(2l)^2=\frac{1}{3}Ml^2
$$

解得

$$
\omega=\frac{6mv_0}{(M+3m)l},\qquad
v=\frac{M-3m}{M+3m}v_0
$$

碰后静止的条件是 $v=0$，即

$$
M=3m
$$

此时 $J=\frac13Ml^2=ml^2$，小球对 $O$ 的"转动惯量" $ml^2$ 与棒相同，二者恰好交换角动量：小球把全部角动量交给棒后停下。这也说明"碰后静止"不是能量消失，而是能量全部转为棒的转动动能。

### 例 5.9 子弹嵌入杆端后杆的偏角

例：质量 $M$ 均匀分布、长为 $l$ 的木杆可绕过端点 $o$ 的光滑轴转动。设其静止时有一质量 $m$ 的子弹以速率 $v$ 水平射入杆的另一端并嵌入其中，求之后杆偏转的角度。

解：第一阶段（碰撞）：忽略轴和重力的冲量矩，系统对 $o$ 轴角动量守恒。

射入前

$$
L_1=mlv
$$

射入后

$$
L_2=(J_M+J_m)\omega=\left(\frac{1}{3}Ml^2+ml^2\right)\omega
$$

$$
mlv=\left(\frac{1}{3}Ml^2+ml^2\right)\omega
$$

$$
\omega=\frac{mv}{\left(\frac{1}{3}M+m\right)l}
$$

第二阶段（摆动）：以 $M$、$m$、地球为系统，只有重力做功，机械能守恒。取初始杆质心位置为势能零点：

$$
E_1=E_{k1}+E_{p1}=\frac{1}{2}J\omega^2-mg\frac{l}{2}
$$

$$
E_2=E_{p2}=Mg\frac{l}{2}(1-\cos\theta)-mg\left(l\cos\theta-\frac{l}{2}\right)
$$

$$
J=J_M+J_m
$$

令 $E_1=E_2$：

$$
\cos\theta=1-\frac{J\omega^2}{(M+2m)gl}
$$

代入 $\omega$ 与 $J$ 得

$$
\theta=\arccos\left[1-\frac{3m^2v^2}{(M+3m)(M+2m)gl}\right]
$$

两个阶段用不同的守恒量：碰撞瞬间用角动量守恒（机械能不守恒，嵌入是完全非弹性）；摆动过程用机械能守恒（无摩擦、只有重力）。把两段混用是这类题最常见的错误。

校注：杆质心与嵌入物到转轴的距离分别为 $l/2$ 与 $l$，二者势能增量之和为 $(M/2+m)gl(1-\cos\theta)$，故中间式分母为 $(M+2m)gl$，与原解最终结果一致。

### 例 5.10 粗糙桌面上的杆

例：质量 $M$、长 $l$ 的均质细棒置于粗糙的水平桌面上，可绕过端点 $o$ 的垂直光滑轴转动。现有质量 $m$、速度 $v_1$ 的小球在桌面上沿与棒长垂直的方向与棒的另一端碰撞后，反弹速度为 $v_2$。求：1. 碰后棒的角速度；2. 棒从碰后到静止所需的时间（设摩擦系数为 $\mu$）。

解 1：碰撞过程对 $o$ 轴角动量守恒（轴光滑，摩擦力的冲量矩在极短时间内可忽略）。取碰前小球方向为正，碰后小球反向：

$$
mv_1l=-mv_2l+J\omega
$$

$$
\omega=\frac{3m(v_1+v_2)}{Ml},\qquad J=\frac{1}{3}Ml^2
$$

解 2：采用杆的支持力沿长度均匀分布的模型。取距轴 $x$ 处质元 $dm=\frac{M}{l}dx$，其切向摩擦力为

$$
df_r=-\mu\,dm\,g=-\mu g\frac{M}{l}dx
$$

对轴的力矩

$$
M_r=\int dM_r=\int_L x\,df_r=-\int_0^l\mu g\frac{M}{l}x\,dx=-\frac{1}{2}\mu Mgl
$$

由角动量定理 $M\,dt=dL=J\,d\omega$：

$$
\int_0^t-\frac{1}{2}\mu Mgl\,dt=J\int_\omega^0d\omega
$$

$$
-\frac{1}{2}\mu Mgl\,t=-J\omega
$$

$$
t=\frac{2J\omega}{\mu Mgl}=\frac{2l\omega}{3\mu g}
=\frac{2m(v_1+v_2)}{\mu Mg}
$$

积分表明，在本题均匀分布的模型中，摩擦合力的作用线通过杆的中点。若支持力分布改变，应按实际分布对轴求矩。

## 5.7 质点平动与刚体转动的对照

| 质点平动 | 刚体定轴转动 |
|---|---|
| 质量 $m$ | 转动惯量 $J$ |
| 位矢 $\vec r$ | 角位置 $\theta$ |
| 速度 $\vec v$ | 角速度 $\vec\omega$ |
| 加速度 $\vec a$ | 角加速度 $\vec\alpha$ |
| 力 $\vec F$ | 力矩 $\vec M=\vec r\times\vec F$ |
| 功 $A=\int\vec F\cdot d\vec s$ | 力矩功 $A=\int_{\theta_1}^{\theta_2}M\,d\theta$ |
| 平动动能 $E_k=\frac12mv^2$ | 转动动能 $E_k=\frac12J\omega^2$ |
| 动量分量 $p_x=mv_x$ | 轴向角动量 $L_z=J\omega$ |
| 冲量 $\vec I=\int_{t_1}^{t_2}\vec F\,dt$ | 冲量矩 $\int_{t_1}^{t_2}\vec M\,dt$ |
| 牛顿第二定律 $F_x=ma_x$ | 定轴转动定律 $M_z=J\alpha$ |
| 动能定理 $A=\int F_t\,ds=\frac12mv_2^2-\frac12mv_1^2$ | 转动动能定理 $A=\int M\,d\theta=\frac12J\omega_2^2-\frac12J\omega_1^2$ |
| 动量定理 $\int\vec F\,dt=m\vec v_2-m\vec v_1$ | 角动量定理 $\int M\,dt=J\omega_2-J\omega_1$ |

这张表不是装饰：每遇到一个平动公式，都可以按"$m\to J$、$v\to\omega$、$F\to M$、$s\to\theta$"逐项翻译，但翻译完要检查适用条件是否仍然成立（例如 $J$ 是否恒定、力矩是否对同一轴）。

## 本章小结

**主线**：刚体 → 平动按质点处理、转动用角量 → 力矩与转动惯量 → $M=J\alpha$ → 角动量定理与守恒 → 力矩的功与转动动能定理 → 机械能守恒。

必须记住的几条：

1. 定轴转动中所有质元共享 $\theta,\omega,\alpha$；线量与半径成正比 $v=r\omega$、$a_t=r\alpha$。
2. $M$、$J$、$L$ 必须相对同一转轴；换轴要同时换三者。$J$ 由质量、分布、轴位置共同决定，平行轴定理只能从质心轴出发。
3. $M=J\alpha$ 与 $F=ma$ 同构；$M$ 为对轴的外力矩代数和，内力矩成对抵消。
4. 角动量守恒的条件是 $\sum M_{\text{外}}=0$（对所选轴），不是"外力为零"。碰撞中轴的反作用力可以改变动量、但不改变对轴的角动量。
5. 力矩的功 $A=\int M\,d\theta$，转动动能 $\frac12J\omega^2$，刚体重力势能用质心高度 $mgz_C$。
6. 有质量滑轮两侧张力不等，差值提供力矩；绳不打滑才有 $a=r\alpha$。

**易错点**：

- 把绕质心的 $J$ 与绕端点的力矩混用；
- 认为"角动量守恒"就一定有"动量守恒"或"机械能守恒"；
- 子弹嵌入、小球碰撞这类题，碰撞段用机械能守恒（应为角动量守恒），或摆动段用角动量守恒（应为机械能守恒）；
- 转台上的人"跑一周"误按对地角速度积分；
- 求分布摩擦力矩时，用实际支持力分布确定等效力臂。

## 原始资料

- 第5章 1~4节-刚体运动学 刚体定轴转动定律.pdf（25 页）
- 第5章5&6节- 角动量守恒定律 转动中的功和能.pdf（24 页）
