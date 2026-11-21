---
slug: "homework-05"
title: "第 5 次作业（刚体力学）"
summary: "刚体力学的原题与解析。"
updatedAt: "2026-11-19"
content_type: "reference"
group: "homework"
displayNumber: "05"
tags: ["基础物理"]
sources: [{"kind": "article", "title": "5 刚体力学习题.pdf", "url": "https://drive.google.com/file/d/1CK6TuCcbKJ17BKPIlEcUln9oUNKv6jPQ/view?usp=drivesdk"}, {"kind": "article", "title": "5 刚体力学习题详解.pdf", "url": "https://drive.google.com/file/d/1JM1l_crOx3D99cyyPeKcO6PcEr8qUFJW/view?usp=drivesdk"}]
---

## 一、选择题

### 题目 1 · 选择题 1

<!-- homework-topic: 子弹穿过悬挂棒后棒偏转 $90^\circ$，求子弹初速 -->

一根长为 $l$、质量为 $M$ 的匀质棒自由悬挂于通过其上端的光滑水平轴上。现有一质量为 $m$ 的子弹以水平速度 $v_0$ 射向棒的中心，并以 $v_0/2$ 的水平速度穿出棒，此后棒的最大偏转角恰为 $90^\circ$，则 $v_0$ 的大小为

（A）$\dfrac{4M}{m}\sqrt{\dfrac{gl}{3}}$；
（B）$\sqrt{\dfrac{gl}{2}}$；
（C）$\dfrac{2M}{m}\sqrt{gl}$；
（D）$\dfrac{16M^{2}gl}{3m^{2}}$。

![子弹穿过悬挂棒](/course-materials/campus-basic-physics/figures/35-01.png)

**答案：A**

**解：** 子弹穿过棒的瞬间，棒所受重力的力矩可忽略，系统对悬点 $O$ 的角动量守恒。棒绕端点的转动惯量
$$
J=\frac13Ml^{2}.
$$
子弹射入点和穿出点均在棒的中点，距 $O$ 为 $l/2$。角动量守恒：
$$
mv_0\frac l2=m\frac{v_0}{2}\frac l2+J\omega .
$$
于是
$$
\frac14mv_0l=\frac13Ml^{2}\omega
\ \Longrightarrow\
\omega=\frac{3mv_0}{4Ml}.
$$
棒偏转到 $90^\circ$ 时，质心升高 $l/2$，由机械能守恒：
$$
\frac12J\omega^{2}=Mg\frac l2
\ \Longrightarrow\
\frac12\cdot\frac13Ml^{2}\omega^{2}
=Mg\frac l2
\ \Longrightarrow\
\omega^{2}=\frac{3g}{l}.
$$
故
$$
\frac{3mv_0}{4Ml}=\sqrt{\frac{3g}{l}}
\ \Longrightarrow\
v_0=\frac{4M}{m}\sqrt{\frac{gl}{3}}.
$$

### 题目 2 · 选择题 2

<!-- homework-topic: 圆柱体制动中损失的动能与所受力矩 -->

圆柱体以 $80\ \mathrm{rad/s}$ 的角速度绕其轴线转动，它对该轴的转动惯量为 $4\ \mathrm{kg\cdot m^{2}}$。在恒力矩作用下，$10\ \mathrm{s}$ 内其角速度降为 $40\ \mathrm{rad/s}$。圆柱体损失的动能和所受力矩的大小为

（A）$80\ \mathrm{J}$，$80\ \mathrm{N\cdot m}$；
（B）$800\ \mathrm{J}$，$40\ \mathrm{N\cdot m}$；
（C）$4000\ \mathrm{J}$，$32\ \mathrm{N\cdot m}$；
（D）$9600\ \mathrm{J}$，$16\ \mathrm{N\cdot m}$。

**答案：D**

**解：** 动能损失
$$
-\Delta E_k=\frac12J\omega_0^{2}-\frac12J\omega^{2}
=\frac12J\left(\omega_0^{2}-\omega^{2}\right)
=\frac12\times4\times\left(80^{2}-40^{2}\right)
=9600\ \mathrm{J}.
$$
恒力矩下角加速度恒定：
$$
\alpha=\frac{\omega_0-\omega}{t}
=\frac{80-40}{10}=4\ \mathrm{rad/s^{2}},
$$
故
$$
M=J\alpha=4\times4=16\ \mathrm{N\cdot m}.
$$

### 题目 3 · 选择题 3

<!-- homework-topic: 阻力矩与角速度成正比时的减速时间与阻力矩做功 -->

一个转动惯量为 $J$ 的圆盘绕一固定轴转动，初角速度为 $\omega_0$。设它所受阻力矩与转动角速度成正比 $M=-k\omega$（$k$ 为正常数）。

（1）它的角速度从 $\omega_0$ 变为 $\omega_0/2$ 所需时间是

（A）$J/2$；（B）$J/k$；（C）$(J/k)\ln2$；（D）$J/(2k)$。

（2）在上述过程中阻力矩所做的功为

（A）$J\omega_0^{2}/4$；（B）$-3J\omega_0^{2}/8$；（C）$-J\omega_0^{2}/4$；（D）$-J\omega_0^{2}/8$。

**答案：（1）C；（2）B。**

**解：** （1）由转动定律
$$
M=J\frac{\mathrm{d}\omega}{\mathrm{d}t}=-k\omega,
$$
分离变量：
$$
\frac{\mathrm{d}\omega}{\omega}=-\frac{k}{J}\mathrm{d}t .
$$
从 $\omega_0$ 积分到 $\omega_0/2$：
$$
\ln\frac{\omega_0/2}{\omega_0}=-\frac{k}{J}t
\ \Longrightarrow\
t=\frac{J}{k}\ln2 .
$$

（2）阻力矩做的功等于动能变化：
$$
A=\frac12J\left(\frac{\omega_0}{2}\right)^{2}
-\frac12J\omega_0^{2}
=\frac12J\left(\frac14\omega_0^{2}-\omega_0^{2}\right)
=-\frac38J\omega_0^{2}.
$$

### 题目 4 · 选择题 4

<!-- homework-topic: 恒力拉动与挂重物两种方式下角加速度的比较 -->

如图所示，对完全相同的两定滑轮（半径 $R$，转动惯量 $J$ 均相同），若分别用 $F$（N）的力和加重物重力 $P=mg=F$（N）时，所产生的角加速度分别为 $\alpha_1$ 和 $\alpha_2$，则

（A）$\alpha_1>\alpha_2$；（B）$\alpha_1=\alpha_2$；（C）$\alpha_1<\alpha_2$；（D）不能确定。

![两种施力方式的定滑轮](/course-materials/campus-basic-physics/figures/35-02.png)

**答案：A**

**解：** 左图直接用恒力 $F=mg$ 拉绳，绳中张力处处等于 $F$，对滑轮的力矩为 $FR$：
$$
FR=J\alpha_1
\ \Longrightarrow\
\alpha_1=\frac{FR}{J}=\frac{mgR}{J}.
$$
右图挂重物 $mg$。重物加速下落，绳中张力 $T<mg$。对重物：
$$
mg-T=ma,
$$
对滑轮：
$$
TR=J\alpha_2,\qquad a=R\alpha_2 .
$$
由 $T=J\alpha_2/R$ 代入重物方程：
$$
mg-\frac{J\alpha_2}{R}=mR\alpha_2
\ \Longrightarrow\
\alpha_2=\frac{mgR}{J+mR^{2}}.
$$
与 $\alpha_1$ 比较，分母多出 $mR^{2}$，故
$$
\alpha_1>\alpha_2 .
$$
物理原因：挂重物时，一部分重力势能转化为重物自身的平动动能，绳中张力小于 $mg$。

### 题目 5 · 选择题 5

<!-- homework-topic: 两子弹反向射入转盘后的角速度 -->

对一绕固定水平轴 $O$ 匀速转动的转盘，沿图示的同一水平直线从相反方向射入两颗质量相同、速率相等的子弹，并停留在盘中，则子弹射入后转盘的角速度应

（A）$\omega=\dfrac{J}{J_1+J}\omega_0$；
（B）$\omega=\dfrac{J}{2J_1+J}\omega_0$；
（C）$\omega=\dfrac{2J_1+J}{J}\omega_0$ 不变；
（D）$\omega=\dfrac{J_1+J}{J}\omega_0$；
（E）无法确定。

> 原卷选项 (C) 的公式与“不变”字样互相矛盾，按原卷保留。

![两子弹射入转盘](/course-materials/campus-basic-physics/figures/35-03.png)

**答案：B**

**解：** 两子弹质量相同、速率相等，且沿同一直线从相反方向射入，对轴 $O$ 的角动量大小相等、方向相反，互相抵消。设每颗子弹对轴的转动惯量为 $J_1=mr^{2}$，则系统对 $O$ 的总角动量在射入前后守恒：
$$
J_1\omega_1+J\omega_0-J_2\omega_2=(J_1+J_2+J)\omega .
$$
其中 $J_1=J_2=mr^{2}$，$\omega_1=\omega_2=v/r$，故左边只剩 $J\omega_0$：
$$
J\omega_0=(2J_1+J)\omega
\ \Longrightarrow\
\omega=\frac{J}{2J_1+J}\omega_0 .
$$
因为分母增大，$\omega<\omega_0$。角动量虽未改变，但转盘的转动惯量因两颗子弹嵌入而增大，故角速度减小；“不变”的说法错误。

### 题目 6 · 选择题 6

<!-- homework-topic: 小球与可绕中点转动的细杆完全非弹性碰撞后的角速度 -->

光滑的桌面上有一长为 $l$、质量为 $m$ 的匀质细杆，可绕过其中点且垂直于杆的竖直光滑固定轴自由转动，其转动惯量为 $J_0=\dfrac{1}{12}ml^{2}$，开始静止。桌面上有质量为 $m$ 的小球，在杆的一端垂直于杆以速率 $v$ 与杆相碰，发生完全非弹性碰撞，与杆粘在一起转动，则碰后这一系统的角速度为

（A）$\dfrac{12v}{13l}$；（B）$\dfrac{6v}{13l}$；（C）$\dfrac{3v}{2l}$；（D）$\dfrac{3v}{8l}$。

**答案：C**

**解：** 碰撞过程对转轴的角动量守恒。小球击中杆的一端，距轴 $l/2$；碰后小球与杆一起转动，系统转动惯量
$$
J=J_0+m\left(\frac l2\right)^{2}
=\frac{1}{12}ml^{2}+\frac14ml^{2}
=\frac13ml^{2}.
$$
角动量守恒：
$$
mv\frac l2=J\omega=\frac13ml^{2}\omega,
$$
故
$$
\omega=\frac{3v}{2l}.
$$

## 二、填空题

### 题目 7 · 填空题 1

<!-- homework-topic: 匀减速转动中角位移再次为零的时刻与边缘线速度 -->

半径为 $r=1.5\ \mathrm{m}$ 的飞轮，初角速度 $\omega_0=10\ \mathrm{rad/s}$，角加速度 $\alpha=-5\ \mathrm{rad/s^{2}}$，若初始时刻角位移为零，则在 $t=\underline{\qquad}$ 时角位移再次为零，而此时边缘上点的线速度为 $v=\underline{\qquad}$。

**答案：$4\ \mathrm{s}$；$-15\ \mathrm{m/s}$。**

**解：** 匀变速转动：
$$
\theta=\omega_0t+\frac12\alpha t^{2}
=10t-\frac52t^{2}.
$$
令 $\theta=0$：
$$
t\left(10-\frac52t\right)=0
\ \Longrightarrow\
t=0\ \text{或}\ t=4\ \mathrm{s}.
$$
$t=4\ \mathrm{s}$ 时
$$
\omega=\omega_0+\alpha t=10-5\times4=-10\ \mathrm{rad/s}.
$$
边缘线速度
$$
v=\omega r=-10\times1.5=-15\ \mathrm{m/s}.
$$
负号表示此时边缘速度方向与初始转动方向相反。

### 题目 8 · 填空题 2

<!-- homework-topic: 细棒绕一端在桌面上转到停止所需的时间 -->

一根质量为 $m$、长度为 $L$ 的匀质细直棒，平放在水平桌面上。若它与桌面间的滑动摩擦系数为 $\mu$，在 $t=0$ 时，使该棒绕过其一端的竖直轴在水平桌面上旋转，其初始角速度为 $\omega_0$，则棒停止转动所需时间为 $\underline{\qquad}$。

**答案：$t=\dfrac{2\omega_0L}{3\mu g}$。**

**解：** 在距轴 $r$ 处取线元 $\mathrm{d}r$，其质量
$$
\mathrm{d}m=\frac mL\mathrm{d}r,
$$
所受摩擦力
$$
\mathrm{d}f=\mu\,\mathrm{d}m\,g=\frac{\mu mg}{L}\mathrm{d}r .
$$
该摩擦力对轴的力矩
$$
\mathrm{d}M=r\,\mathrm{d}f=\frac{\mu mg}{L}r\,\mathrm{d}r .
$$
整根棒所受总摩擦力矩
$$
M_f=\int_0^{L}\frac{\mu mg}{L}r\,\mathrm{d}r
=\frac{\mu mgL}{2}.
$$
棒的转动惯量 $J=\dfrac13mL^{2}$，角加速度大小
$$
\alpha=\frac{M_f}{J}
=\frac{\mu mgL/2}{mL^{2}/3}
=\frac{3\mu g}{2L}.
$$
停止所需时间
$$
t=\frac{\omega_0}{\alpha}
=\frac{2\omega_0L}{3\mu g}.
$$

### 题目 9 · 填空题 3

<!-- homework-topic: 人由盘边走到盘心时角速度与动能的变化 -->

在自由旋转的水平圆盘上，站一质量为 $m$ 的人。圆盘半径为 $R$，转动惯量为 $J$，角速度为 $\omega$。如果这人由盘边走到盘心，则角速度的变化 $\Delta\omega=\underline{\qquad}$；系统动能的变化 $\Delta E_k=\underline{\qquad}$。

**答案：$\Delta\omega=\dfrac{mR^{2}}{J}\omega$；$\Delta E_k=\dfrac12mR^{2}\omega^{2}\left(1+\dfrac{mR^{2}}{J}\right)$。**

**解：** 人从盘边走到盘心的过程中，系统对竖直轴无外力矩，角动量守恒。初态
$$
L_i=\left(J+mR^{2}\right)\omega .
$$
人到盘心后，其对轴的转动惯量为零，末态 $L_f=J\omega'$。故
$$
\omega'=\frac{J+mR^{2}}{J}\omega
=\omega\left(1+\frac{mR^{2}}{J}\right),
$$
$$
\Delta\omega=\omega'-\omega=\frac{mR^{2}}{J}\omega .
$$
动能变化
$$
\Delta E_k=\frac12J\omega'^{2}
-\frac12\left(J+mR^{2}\right)\omega^{2}.
$$
代入 $\omega'$：
$$
\Delta E_k=\frac12J\omega^{2}
\left(1+\frac{mR^{2}}{J}\right)^{2}
-\frac12\left(J+mR^{2}\right)\omega^{2}
=\frac12mR^{2}\omega^{2}
\left(1+\frac{mR^{2}}{J}\right).
$$
$\Delta E_k>0$，说明人走近盘心时靠自身内力做功，使系统转动动能增加。

### 题目 10 · 填空题 4

<!-- homework-topic: 砂粒落到转台上使角速度减半所需时间 -->

如图所示，转台绕中心竖直轴以角速度 $\omega_0$ 作匀速转动，转台对该轴的转动惯量 $J=5\times10^{-5}\ \mathrm{kg\cdot m^{2}}$。现有砂粒以 $1\ \mathrm{g/s}$ 的流量落到转台，并粘在台面形成一半径 $r=0.1\ \mathrm{m}$ 的圆。则使转台角速度变为 $\omega_0/2$ 所花的时间为 $\underline{\qquad}$。

**答案：$5\ \mathrm{s}$。**

**解：** 砂粒落下的过程对竖直轴无外力矩，角动量守恒。设经过时间 $t$ 落下的砂粒质量为 $m$，它们粘在半径 $r$ 处，转动惯量为 $mr^{2}$。初态只有转台转动：
$$
J\omega_0=\left(J+mr^{2}\right)\frac{\omega_0}{2}.
$$
约去 $\omega_0$：
$$
J=\left(J+mr^{2}\right)\frac12
\ \Longrightarrow\
mr^{2}=J .
$$
于是
$$
m=\frac{J}{r^{2}}
=\frac{5\times10^{-5}}{0.1^{2}}
=5\times10^{-3}\ \mathrm{kg}=5\ \mathrm{g}.
$$
砂粒流量 $1\ \mathrm{g/s}$，故
$$
t=5\ \mathrm{s}.
$$

### 题目 11 · 填空题 5

<!-- homework-topic: 两圆盘滑轮与 $m$、$2m$ 重物系统中两轮间绳的张力 -->

> 原卷此题误编为“3.”，按顺序应为第 5 题。

如图所示，一轻绳跨过两个质量均为 $m$、半径均为 $R$ 的匀质圆盘状定滑轮。绳的两端分别系着质量分别为 $m$ 和 $2m$ 的重物，不计滑轮转轴的摩擦。将系统由静止释放，且绳与两滑轮间均无相对滑动，则两滑轮之间绳的张力为 $\underline{\qquad}$。

![两滑轮与 m、2m 重物](/course-materials/campus-basic-physics/figures/35-04.png)

**答案：$T=\dfrac{11}{8}mg$。**

**解：** 设右侧 $2m$ 重物向下、左侧 $m$ 重物向上的加速度为 $a$。绳中张力：右侧段 $T_1$，左侧段 $T_2$，两滑轮之间为 $T$。

对两重物：
$$
2mg-T_1=2ma,\qquad T_2-mg=ma .
$$
两滑轮均为匀质圆盘，$J=\dfrac12mR^{2}$，角加速度 $\alpha=a/R$。对右滑轮：
$$
(T_1-T)R=J\alpha=\frac12mR^{2}\cdot\frac aR
\ \Longrightarrow\
T_1-T=\frac12ma .
$$
对左滑轮：
$$
(T-T_2)R=J\alpha
\ \Longrightarrow\
T-T_2=\frac12ma .
$$
两式相加：
$$
T_1-T_2=ma .
$$
另一方面，由重物方程
$$
T_1=2m(g-a),\qquad T_2=m(g+a).
$$
代入 $T_1-T_2=ma$：
$$
2mg-2ma-mg-ma=ma
\ \Longrightarrow\
mg=4ma
\ \Longrightarrow\
a=\frac g4 .
$$
于是
$$
T_2=m\left(g+\frac g4\right)=\frac54mg,
$$
$$
T=T_2+\frac12ma
=\frac54mg+\frac12m\cdot\frac g4
=\frac54mg+\frac18mg
=\frac{11}{8}mg .
$$

## 三、计算题

### 题目 12 · 计算题 1

<!-- homework-topic: 斜面上物体经绳带动飞轮时的加速度与绳中张力 -->

一物体质量为 $m=20\ \mathrm{kg}$，沿一和水平面成 $30^\circ$ 角的斜面下滑，如图三 1 所示，滑动摩擦因数为 $1/(2\sqrt3)$，绳的一端系于物体上，另一端绕在匀质飞轮上，飞轮可绕中心轴转动，质量为 $M=10\ \mathrm{kg}$，半径为 $0.1\ \mathrm{m}$。求：

（1）物体的加速度；
（2）绳中的张力。

![斜面、绳与飞轮](/course-materials/campus-basic-physics/figures/35-05.png)

**答案：（1）$a=1.96\ \mathrm{m/s^{2}}$，沿斜面向下；（2）$T=9.8\ \mathrm{N}$。**

**解：** 物体沿斜面下滑，绳带动飞轮转动。设加速度为 $a$，绳中张力为 $T$。对物体沿斜面方向：
$$
mg\sin30^\circ-\mu mg\cos30^\circ-T=ma .
$$
垂直斜面方向：
$$
N-mg\cos30^\circ=0 .
$$
对匀质飞轮，$J=\dfrac12Mr^{2}$。绳的拉力产生力矩：
$$
Tr=J\alpha,\qquad a=r\alpha .
$$
代入 $J$：
$$
T=\frac{J\alpha}{r}
=\frac{\frac12Mr^{2}\cdot(a/r)}{r}
=\frac12Ma .
$$
将 $T=\frac12Ma$ 代入物体方程：
$$
mg\left(\sin30^\circ-\mu\cos30^\circ\right)
=ma+\frac12Ma
=\left(m+\frac M2\right)a .
$$
先算分子：
$$
\sin30^\circ-\mu\cos30^\circ
=\frac12-\frac{1}{2\sqrt3}\cdot\frac{\sqrt3}{2}
=\frac12-\frac14=\frac14 .
$$
故
$$
a=\frac{mg/4}{m+M/2}
=\frac{20\times9.8/4}{20+5}
=\frac{49}{25}
=1.96\ \mathrm{m/s^{2}}.
$$
张力
$$
T=\frac12Ma=\frac12\times10\times1.96=9.8\ \mathrm{N}.
$$

### 题目 13 · 计算题 2

<!-- homework-topic: 桌面上物体经滑轮悬挂重物时的加速度与两端张力 -->

如图所示，物体 1 和 2 的质量分别为 $m_1$ 与 $m_2$，滑轮的转动惯量为 $J$，半径为 $r$。

（1）如物体 2 与桌面间的摩擦系数为 $\mu$，求系统的加速度 $a$ 及绳中的张力 $T_1$ 和 $T_2$；
（2）如物体 2 与桌面间为光滑接触，求系统的加速度 $a$ 及绳中的张力 $T_1$ 和 $T_2$。

（设绳子与滑轮间无相对滑动，滑轮与转轴无摩擦。）

![桌面物体、滑轮与悬挂物体](/course-materials/campus-basic-physics/figures/35-06.png)

**答案：**

（1）记 $D=m_1+m_2+\dfrac{J}{r^{2}}$，
$$
a=\frac{m_1-\mu m_2}{D}g,\qquad
T_1=\frac{m_1\left[m_2(1+\mu)+\dfrac{J}{r^{2}}\right]}{D}g,\qquad
T_2=\frac{m_2\left[m_1(1+\mu)+\mu\dfrac{J}{r^{2}}\right]}{D}g .
$$

（2）令 $\mu=0$：
$$
a=\frac{m_1}{D}g,\qquad
T_1=\frac{m_1\left(m_2+\dfrac{J}{r^{2}}\right)}{D}g,\qquad
T_2=\frac{m_1m_2}{D}g .
$$

**解：** （1）设物体 1 向下运动、物体 2 向右运动，加速度大小均为 $a$；绳中张力分别为 $T_1$（竖直段）与 $T_2$（水平段）。滑轮角加速度 $\alpha=a/r$，取转动方向与运动一致。

对物体 1：
$$
m_1g-T_1=m_1a .
$$
对物体 2：
$$
T_2-\mu N=m_2a,\qquad N=m_2g .
$$
对滑轮：
$$
(T_2-T_1)r=J\alpha=J\frac ar
\ \Longrightarrow\
T_2-T_1=\frac{J}{r^{2}}a .
$$
由前两式
$$
T_1=m_1(g-a),\qquad T_2=m_2a+\mu m_2g .
$$
代入滑轮方程：
$$
m_2a+\mu m_2g-m_1g+m_1a=\frac{J}{r^{2}}a .
$$
整理得
$$
\left(m_1+m_2+\frac{J}{r^{2}}\right)a
=(m_1-\mu m_2)g,
$$
故
$$
a=\frac{m_1-\mu m_2}{m_1+m_2+J/r^{2}}g .
$$
于是
$$
T_1=m_1(g-a)
=\frac{m_1\left[m_2(1+\mu)+J/r^{2}\right]}{m_1+m_2+J/r^{2}}g,
$$
$$
T_2=m_2(a+\mu g)
=\frac{m_2\left[m_1(1+\mu)+\mu J/r^{2}\right]}{m_1+m_2+J/r^{2}}g .
$$

（2）$\mu=0$ 时，将上式中的 $\mu$ 置零：
$$
a=\frac{m_1}{m_1+m_2+J/r^{2}}g,
$$
$$
T_1=\frac{m_1\left(m_2+J/r^{2}\right)}{m_1+m_2+J/r^{2}}g,\qquad
T_2=\frac{m_1m_2}{m_1+m_2+J/r^{2}}g .
$$
校验：$J=0$ 且 $\mu=0$ 时，$a=\dfrac{m_1g}{m_1+m_2}$，$T_1=T_2=\dfrac{m_1m_2g}{m_1+m_2}$，退化为理想轻绳结果。

### 题目 14 · 计算题 3

<!-- homework-topic: 细杆自水平位置释放转到铅直位置时的动能与角速度 -->

一匀质细杆，质量为 $0.5\ \mathrm{kg}$，长为 $0.4\ \mathrm{m}$，可绕杆一端的水平轴旋转。若将此杆放在水平位置，然后从静止释放，试求杆转动到铅直位置时的动能和角速度。

**答案：$E_k=0.98\ \mathrm{J}$；$\omega=8.57\ \mathrm{rad/s}$。**

**解：** 杆绕端点转动，$J=\dfrac13ml^{2}$。从水平到铅直，质心下降 $l/2$，重力势能转化为转动动能：
$$
E_k=mg\frac l2
=0.5\times9.8\times0.2
=0.98\ \mathrm{J}.
$$
由 $E_k=\dfrac12J\omega^{2}$：
$$
\omega=\sqrt{\frac{2E_k}{J}}
=\sqrt{\frac{2mg(l/2)}{ml^{2}/3}}
=\sqrt{\frac{3g}{l}}
=\sqrt{\frac{3\times9.8}{0.4}}
=8.57\ \mathrm{rad/s}.
$$

### 题目 15 · 计算题 4

<!-- homework-topic: 弹簧—滑轮—斜面系统中物体下滑的最大距离与给定位置的速率 -->

如图所示，滑轮的转动惯量 $J=0.5\ \mathrm{kg\cdot m^{2}}$，半径 $r=30\ \mathrm{cm}$，弹簧的劲度系数 $k=2.0\ \mathrm{N/m}$，重物的质量 $m=2.0\ \mathrm{kg}$。当此滑轮—重物系统从静止开始启动，开始时弹簧没有伸长。滑轮与绳子间无相对滑动，其它部分摩擦忽略不计。问物体能沿斜面下滑多远？当物体沿斜面下滑 $1.00\ \mathrm{m}$ 时，它的速率有多大？

![斜面、弹簧与滑轮](/course-materials/campus-basic-physics/figures/35-07.png)

**答案：（1）$x_{\max}=11.8\ \mathrm{m}$；（2）下滑 $1.00\ \mathrm{m}$ 时 $v=1.7\ \mathrm{m/s}$。**

**解：** 物体沿斜面下滑 $x$ 时，弹簧伸长量也是 $x$（绳不可伸、无相对滑动），滑轮边缘线速度与物体速率相同，$v=\omega r$。取初始位置为重力势能零点，由机械能守恒：
$$
mgx\sin37^\circ
=\frac12kx^{2}+\frac12mv^{2}+\frac12J\omega^{2}.
$$
代入 $\omega=v/r$：
$$
mgx\sin37^\circ
=\frac12kx^{2}+\frac12\left(m+\frac{J}{r^{2}}\right)v^{2}.
$$

（1）最远处 $v=0$：
$$
mgx\sin37^\circ=\frac12kx^{2}
\ \Longrightarrow\
x_{\max}=\frac{2mg\sin37^\circ}{k}
=\frac{2\times2.0\times9.8\times0.6018}{2.0}
=11.8\ \mathrm{m}.
$$

（2）$x=1.00\ \mathrm{m}$ 时：
$$
v^{2}
=\frac{2mgx\sin37^\circ-kx^{2}}
{m+J/r^{2}}.
$$
计算分子：
$$
2\times2.0\times9.8\times1.00\times0.6018
-2.0\times1.00^{2}
=23.6-2.0=21.6\ \mathrm{J}.
$$
分母：
$$
2.0+\frac{0.5}{0.30^{2}}
=2.0+5.556=7.556\ \mathrm{kg}.
$$
故
$$
v^{2}=\frac{21.6}{7.556}=2.86\ \mathrm{m^{2}/s^{2}},
\qquad
v=1.69\ \mathrm{m/s}\approx1.7\ \mathrm{m/s}.
$$

### 题目 16 · 计算题 5

<!-- homework-topic: 子弹射入悬挂木棒后的角速度与最大偏转角 -->

长 $l=0.40\ \mathrm{m}$、质量 $M=1.00\ \mathrm{kg}$ 的匀质木棒，可绕水平轴 $O$ 在竖直平面内转动，开始时棒自然竖直悬垂。现有质量 $m=8\ \mathrm{g}$ 的子弹以 $v=200\ \mathrm{m/s}$ 的速率从 $A$ 点射入棒中，$A$、$O$ 点的距离为 $3l/4$，如图所示。求：

（1）棒开始运动时的角速度；
（2）棒的最大偏转角。

![子弹射入木棒](/course-materials/campus-basic-physics/figures/35-08.png)

**答案：（1）$\omega\approx8.9\ \mathrm{rad/s}$，（2）$\theta\approx94.3^\circ$。**

**解：** （1）子弹射入棒的过程对 $O$ 轴的角动量守恒。棒对 $O$ 的转动惯量
$$
J_{\text{rod}}=\frac13Ml^{2}.
$$
子弹击中点距 $O$ 为 $3l/4$，碰后与棒一起转动，系统转动惯量
$$
J=J_{\text{rod}}+m\left(\frac{3l}{4}\right)^{2}
=\frac13Ml^{2}+\frac{9}{16}ml^{2}.
$$
代入数值：
$$
J=\frac13\times1.00\times0.40^{2}
+\frac{9}{16}\times0.008\times0.40^{2}
=0.05333+0.00072
=0.05405\ \mathrm{kg\cdot m^{2}}.
$$
角动量守恒：
$$
mv\frac{3l}{4}=J\omega,
$$
$$
\omega=\frac{\frac34mvl}{J}
=\frac{\frac34\times0.008\times200\times0.40}{0.05405}
=\frac{0.48}{0.05405}
=8.88\ \mathrm{rad/s}\approx8.9\ \mathrm{rad/s}.
$$

（2）碰后系统机械能守恒。设最大偏转角为 $\theta$，棒质心升高 $\dfrac l2(1-\cos\theta)$，子弹升高 $\dfrac{3l}{4}(1-\cos\theta)$：
$$
\frac12J\omega^{2}
=\left(Mg\frac l2+mg\frac{3l}{4}\right)(1-\cos\theta).
$$
代入数值：
$$
\frac12\times0.05405\times8.88^{2}
=2.13\ \mathrm{J},
$$
$$
Mg\frac l2+mg\frac{3l}{4}
=1.00\times9.8\times0.20+0.008\times9.8\times0.30
=1.96+0.0235
=1.98\ \mathrm{J}.
$$
故
$$
1-\cos\theta=\frac{2.13}{1.98}=1.074,
$$
$$
\cos\theta=-0.074,
\qquad
\theta=94.3^\circ .
$$
原详解给出 $94.5^\circ$，与使用提前舍入的 $\omega=8.9\ \mathrm{rad/s}$ 计算相符。保留中间值直到最后再舍入，得到 $94.3^\circ$。

### 题目 17 · 计算题 6

<!-- homework-topic: 弹性小球撞击悬挂棒后的小球初速与所受冲量 -->

质量为 $M$、长为 $l$ 的均匀直棒，可绕垂直于棒的一端的水平轴 $O$ 无摩擦地转动。它原来静止在平衡位置上。现有一质量为 $m$ 的弹性小球飞来，正好在棒的下端与棒垂直地相撞。相撞后，使棒从平衡位置处摆动到最大角度 $\theta=30^\circ$ 处。

（1）这碰撞设为弹性碰撞，试计算小球初速 $v_0$ 的值；
（2）相撞时，小球受到多大的冲量？

![弹性小球撞击木棒](/course-materials/campus-basic-physics/figures/35-09.png)

**答案：**

（1）
$$
v_0=\frac{M+3m}{12m}\sqrt{6(2-\sqrt3)gl};
$$

（2）冲量大小
$$
I=\frac{M}{6}\sqrt{6(2-\sqrt3)gl},
$$
方向与小球初速度方向相反。

**解：** 设碰后小球速度为 $v$，棒获得的角速度为 $\omega$。棒对 $O$ 的转动惯量
$$
I_{\text{rod}}=\frac13Ml^{2}.
$$
碰撞为弹性碰撞，对 $O$ 轴角动量守恒：
$$
mv_0l=I_{\text{rod}}\omega+mvl. \qquad (1)
$$
机械能守恒：
$$
\frac12mv_0^{2}
=\frac12I_{\text{rod}}\omega^{2}+\frac12mv^{2}. \qquad (2)
$$
碰后棒摆到 $30^\circ$，由机械能守恒：
$$
\frac12I_{\text{rod}}\omega^{2}
=Mg\frac l2\left(1-\cos30^\circ\right).
$$
代入 $I_{\text{rod}}=\frac13Ml^{2}$：
$$
\frac12\cdot\frac13Ml^{2}\omega^{2}
=Mg\frac l2\left(1-\frac{\sqrt3}{2}\right),
$$
$$
\omega^{2}=\frac{3g}{l}\left(1-\frac{\sqrt3}{2}\right)
=\frac{3g(2-\sqrt3)}{2l}. \qquad (3)
$$
由弹性碰撞的恢复系数为 1（固定轴，碰撞点速度反向关系）：
$$
v_0=\omega l-v. \qquad (4)
$$
即 $v=\omega l-v_0$。代入角动量方程（1）：
$$
mv_0l=\frac13Ml^{2}\omega+m(\omega l-v_0)l,
$$
$$
2mv_0l=\omega l\left(\frac13Ml+ml\right)
\ \Longrightarrow\
v_0=\frac{\omega l(M+3m)}{6m}.
$$
将式（3）的 $\omega$ 代入：
$$
v_0=\frac{M+3m}{6m}\sqrt{\frac{3gl(2-\sqrt3)}{2}}
=\frac{M+3m}{12m}\sqrt{6(2-\sqrt3)gl}.
$$

（2）碰撞过程中小球受到的冲量
$$
I=m(v-v_0)=m(\omega l-2v_0).
$$
代入 $v_0=\dfrac{\omega l(M+3m)}{6m}$：
$$
I=m\omega l\left[1-\frac{M+3m}{3m}\right]
=m\omega l\cdot\left(-\frac{M}{3m}\right)
=-\frac13M\omega l .
$$
负号表示冲量方向与初速度方向相反。其大小
$$
I=\frac13M\omega l
=\frac{M}{6}\sqrt{6(2-\sqrt3)gl}.
$$
这与原详解的结果一致。
