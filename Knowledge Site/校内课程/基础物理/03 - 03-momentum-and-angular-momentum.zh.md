---
slug: "03-momentum-and-angular-momentum"
title: "动量与角动量"
summary: "冲量、动量与角动量守恒，以及质心运动。"
updatedAt: "2026-11-19"
content_type: "reference"
group: "course"
displayNumber: "03"
tags: ["基础物理"]
sources: [{"kind": "article", "title": "第3章1-5节 动量 动量守恒 质心运动定理.pdf", "url": "https://drive.google.com/file/d/1eH0oSMIO2EgVSKMF8DSPeusoIWXWrUID/view?usp=drivesdk"}, {"kind": "article", "title": "第3章6-9节 角动量 角动量定理 角动量守恒.pdf", "url": "https://drive.google.com/file/d/1XkohwAVURnyfAu9vyab_-Y-pcsp2XDr2/view?usp=drivesdk"}]
---

## 3.0 为什么要讲守恒定律

牛顿第二定律 $\vec F=\mathrm d\vec p/\mathrm dt$ 描述的是**力的瞬时效应**。把力对时间累积，得到冲量，导致动量变化；把力对空间累积，得到功，导致能量变化。当累积量为零时，就得到守恒定律：

- 合外力为零 → 动量守恒；
- 合力的功为零 → 动能不变；外力与非保守内力的总功为零 → 系统机械能不变。

守恒定律的地位特殊：自然界一切过程都遵守它们，凡违背守恒定律的过程都不可能实现；而且它们往往能在不知道过程细节（碰撞中的力多大多久）的情况下给出结果，是解决实际问题的有力工具。

## 3.1 冲量 动量定理

### 3.1.1 质点的动量定理

由牛顿第二定律出发：

$$
\vec F=\frac{\mathrm d(m\vec v)}{\mathrm dt}\ \Longrightarrow\ \vec F\,\mathrm dt=\mathrm d(m\vec v)
$$

两边从 $t_1$ 积分到 $t_2$：

$$
\int_{t_1}^{t_2}\vec F\,\mathrm dt=\int_{\vec v_1}^{\vec v_2}\mathrm d(m\vec v)=m\vec v_2-m\vec v_1
$$

定义**动量** $\vec p=m\vec v$，**冲量**

$$
\vec I=\int_{t_1}^{t_2}\vec F\,\mathrm dt
$$

即得**质点的动量定理**：

$$
\boxed{\ \vec I=\vec p_2-\vec p_1\ }
$$

文字表述：**质点所受合力的冲量等于质点动量的增量。**

矢量关系如图：$\vec p_1$、$\vec p_2$ 与 $\vec I$ 构成闭合三角形，注意是 $\vec I=\vec p_2-\vec p_1$ 而不是 $\vec p_1+\vec p_2$。

**分量式**：

$$
I_x=\int_{t_1}^{t_2}F_x\,\mathrm dt=p_{x2}-p_{x1}=mv_{x2}-mv_{x1}
$$

$$
I_y=\int_{t_1}^{t_2}F_y\,\mathrm dt=p_{y2}-p_{y1}=mv_{y2}-mv_{y1}
$$

$$
I_z=\int_{t_1}^{t_2}F_z\,\mathrm dt=p_{z2}-p_{z1}=mv_{z2}-mv_{z1}
$$

**某个方向的冲量只改变其对应方向的动量。** 这是"分量守恒"的由来。

补充两点课件未明说但必须掌握的：

- 冲量是**过程量**，与力的作用时间有关；动量是**状态量**。
- 若碰撞时间 $\Delta t$ 很短，可用**平均冲力**估算：$\bar{\vec F}=\dfrac{\vec I}{\Delta t}$。这正是"冲量一定时，作用时间越长，平均冲力越小"（缓冲、安全气囊）的物理依据。

### 例 3.1 圆周运动中的冲量

质量 $m$ 的质点作半径 $R=1$ m 的圆周运动，运动方程 $s=\pi t^{2}$（以 $S_0$ 点为自然坐标原点），求 $t_1=1/2$ s 到 $t_2=\sqrt{3}/2$ s 内质点所受合力的冲量。

![](/course-materials/campus-basic-physics/figures/03-01.png)

解：先求速率与两时刻的位置。

$$
s_1=\pi\left(\frac{1}{2}\right)^{2}=\frac{\pi}{4},\qquad \theta_1=\frac{s_1}{R}=\frac{\pi}{4}
$$

$$
s_2=\pi\left(\frac{\sqrt{3}}{2}\right)^{2}=\frac{3\pi}{4},\qquad \theta_2=\frac{s_2}{R}=\frac{3\pi}{4}
$$

$$
v=\frac{\mathrm ds}{\mathrm dt}=2\pi t\ \Longrightarrow\ v_1=\pi,\quad v_2=\sqrt{3}\pi
$$

于是

$$
\vec I=m\vec v_2-m\vec v_1=\Delta(m\vec v)
$$

$$
|\vec I|=|\Delta(m\vec v)|=\sqrt{(mv_1)^{2}+(mv_2)^{2}}=m\sqrt{\pi^{2}+3\pi^{2}}=2m\pi\ \ (\mathrm{kg\cdot m\cdot s^{-1}})
$$

方向：速度沿切线，$\theta_1=45^\circ$ 时 $\vec v_1$ 指向 $135^\circ$ 方向，$\theta_2=135^\circ$ 时 $\vec v_2$ 指向 $225^\circ$ 方向，两者互相垂直。矢量图中

$$
\tan\alpha=\frac{mv_1}{mv_2}=\frac{\sqrt{3}}{3}\ \Rightarrow\ \alpha=30^\circ
$$

$$
\theta=270^\circ-\left[(90^\circ-\alpha)-\theta_1\right]=255^\circ
$$

即冲量方向与 $+x$ 轴成 $255^\circ$（第三象限）。

要点：不能把"合力"当成恒定的向心力直接乘时间——向心力方向一直在变，冲量必须用矢量差 $\Delta\vec p$ 求，这正是动量定理比分力积分更方便的地方。

### 3.1.2 质点系的动量定理

设第 $i$ 个质点受外力 $\vec F_i$、内力 $\vec f_i$，对它用质点动量定理：

$$
\left(\vec F_i+\vec f_i\right)\mathrm dt=\mathrm d\left(m_i\vec v_i\right)
$$

对整个系统求和：

$$
\sum_i\left(\vec F_i+\vec f_i\right)\mathrm dt=\mathrm d\sum_i\left(m_i\vec v_i\right)
$$

$$
\sum_i\vec F_i=\vec F_{\text{合外}},\qquad \sum_i\vec f_i=\vec f_{\text{合内}}
$$

由牛顿第三定律，内力两两成对抵消，故

$$
\sum_i\vec f_i=\vec f_{\text{合内}}=0
$$

于是

$$
\vec F_{\text{合外}}\,\mathrm dt=\mathrm d\vec p,\qquad \vec p=\sum_i m_i\vec v_i=\sum_i\vec p_i
$$

积分得**质点系动量定理**：

$$
\sum_{i=1}^{n}\vec I_i=\vec p_2-\vec p_1
$$

即：**质点系所受外力的总冲量等于系统总动量的增量。**

注意"外力的总冲量"是各外力冲量的矢量和，内力不出现在方程中——这是系统方法的最大好处。

## 3.2 动量守恒定律

**动量守恒定律**：若质点系所受合外力为零，则系统总动量保持不变。

$$
\vec F_{\text{合外}}=0\ \Longrightarrow\ \frac{\mathrm d}{\mathrm dt}\sum_i m_i\vec v_i=0\ \Longrightarrow\ \sum_{i=1}^{n}m_i\vec v_i=m_1\vec v_1+m_2\vec v_2+\cdots+m_n\vec v_n=\text{恒矢量}
$$

### 适用条件（六条，逐条落实）

1. 定律是**对一个系统**而言的，先明确系统边界。
2. 只有**外力**能改变系统总动量，内力只能改变系统内个别质点的动量。
3. 守恒必须对过程中的**任意时刻**成立（不是只对首末）。
4. 定律**只对惯性系**成立。
5. 定律是矢量式：若系统在某一方向合外力为零，则该方向动量守恒，

$$
F_x=\sum_i F_{ix}=0\ \Longrightarrow\ p_x=\sum_i m_iv_{ix}=\text{常量}
$$

6. 在**碰撞、打击、爆炸**等短暂过程中，若外力的总冲量相对所研究的动量变化可忽略，可近似使用动量守恒。需比较冲量大小，不能仅凭过程名称作判断。

**易错点**：动量守恒 ≠ 动能守恒。完全非弹性碰撞动量守恒而动能损失最大；爆炸过程动量守恒而动能增加。判断"守恒"必须先看条件，不能凭"碰撞"二字就写守恒式。

### 例 3.2 人在车上走

光滑地面上有质量 $M$、长 $L$ 的小车，一端站质量 $m$ 的人。初始都静止，人从车一端走到另一端，求人和车各自对地移动的距离。

![](/course-materials/campus-basic-physics/figures/03-02.png)

解：人与车组成的系统水平方向不受外力，动量守恒，且初动量为零：

$$
m\vec v_{\text{人}}+M\vec v_{\text{车}}=0\ \Longrightarrow\ \vec v_{\text{车}}=-\frac{m}{M}\vec v_{\text{人}}
$$

人对车的相对速度

$$
\vec v_{\text{人车}}=\vec v_{\text{人}}-\vec v_{\text{车}}=\vec v_{\text{人}}+\frac{m}{M}\vec v_{\text{人}}=\frac{M+m}{M}\vec v_{\text{人}}
$$

对时间积分（$\vec v$ 的方向始终不变，可化为标量）：

$$
\int_0^t v_{\text{人车}}\,\mathrm dt=\frac{M+m}{M}\int_0^t v_{\text{人}}\,\mathrm dt
$$

$$
L=\frac{M+m}{M}x\ \Longrightarrow\ x=\frac{M}{M+m}L
$$

其中 $x$ 是人对地的位移。车的位移

$$
X=\int v_{\text{车}}\,\mathrm dt=-\frac{m}{M}\int v_{\text{人}}\,\mathrm dt=-\frac{m}{M}x=-\frac{m}{M+m}L
$$

结果：人对地前进 $\dfrac{M}{M+m}L$，车对地后退 $\dfrac{m}{M+m}L$，两者之和恰为 $L$，且

$$
mx+MX=0
$$

即**质心不动**。这类题的通用解法就是"动量守恒 → 速度关系 → 对时间积分 → 位移关系"，不必求中间过程的速度。

### 例 3.3 软绳落地对地面的压力

柔软绳长 $l$、线密度 $\rho$，一端着地开始自由下落。求下落过程中任意时刻（空中绳长为 $y$）绳对地面的压力。

![](/course-materials/campus-basic-physics/figures/03-03.png)

解：取竖直向上为正，地面为原点 $O$。设地面对绳的支持力为 $N$，由动量定理

$$
(N-\rho gl)\,\mathrm dt=\mathrm dp
$$

这里 $\rho gl$ 是整条绳受到的重力（注意是全长，不是空中部分）。绳的总动量只由空中部分贡献：

$$
p=\rho yv\ \Longrightarrow\ \frac{\mathrm dp}{\mathrm dt}=\rho\frac{\mathrm d(yv)}{\mathrm dt}
$$

$$
N=\rho gl+\rho\frac{\mathrm d(yv)}{\mathrm dt}
$$

其中

$$
\frac{\mathrm d(yv)}{\mathrm dt}=v\frac{\mathrm dy}{\mathrm dt}+y\frac{\mathrm dv}{\mathrm dt}=v^{2}+y(-g)
$$

又由自由落体 $v=-gt$、$y=l-\dfrac{1}{2}gt^{2}$，得 $v^{2}=2g(l-y)$，于是

$$
\frac{\mathrm d(yv)}{\mathrm dt}=-yg+2g(l-y)
$$

$$
N=\rho gl+\rho\left[-yg+2g(l-y)\right]=3\rho g(l-y)
$$

由牛顿第三定律，绳对地面的压力大小也为 $3\rho g(l-y)$。

讨论：落在地面上的绳重为 $\rho g(l-y)$，而压力是它的 **3 倍**。多出的 $2\rho g(l-y)$ 来自绳段速度骤变为零所损失的动量——这就是"下落的链条砸在秤上，读数约为已落地部分重量的三倍"这一经典结论。

## 3.3 火箭飞行原理

火箭靠燃料燃烧喷出的气体产生反冲推力。设忽略地球引力与空气阻力，某时刻火箭质量 $M$、速度 $\vec v$；经 $\mathrm dt$ 喷出质量 $\mathrm dm>0$ 的气体，喷气速度（气体相对火箭）为 $\vec u$，火箭速度变为 $\vec v+\mathrm d\vec v$。

以火箭＋喷出气体为系统，动量守恒：

$$
(M-\mathrm dm)(v+\mathrm dv)+\mathrm dm\,(v+\mathrm dv-u)=Mv
$$

展开并略去二阶小量 $\mathrm dm\,\mathrm dv$：

$$
M\,\mathrm dv=u\,\mathrm dm
$$

注意火箭质量在减少，令 $\mathrm dM=-\mathrm dm$（$\mathrm dM<0$）：

$$
M\,\mathrm dv=-u\,\mathrm dM\ \Longrightarrow\ \mathrm dv=-u\frac{\mathrm dM}{M}
$$

积分（设初态质量 $M_i$、速度 $v_i$）：

$$
v=v_i+u\ln\frac{M_i}{M}
$$

燃料燃尽时火箭质量 $M_f$，最终速度

$$
v_f=v_i+u\ln\frac{M_i}{M_f}
$$

$\dfrac{M_i}{M_f}$ 称**质量比**。要点：速度增量与质量比成**对数**关系——想靠单纯增加燃料把速度翻倍，质量比要平方，代价极大，这正是要造多级火箭的原因。

**多级火箭**：设各级质量比 $N_1,N_2,N_3,\dots$，逐级点火、抛掉空壳：

$$
v_1=u\ln N_1,\qquad v_2=v_1+u\ln N_2,\qquad v_3=v_2+u\ln N_3
$$

$$
v_3=u\left(\ln N_1+\ln N_2+\ln N_3\right)=u\ln\left(N_1N_2N_3\right)
$$

取 $N_1=N_2=N_3=3$、$u=2.5\times10^{3}$ m/s：

$$
v_3=2.5\times10^{3}\times3\ln3\approx8.2\times10^{3}\ \mathrm{m/s}
$$

对照宇宙速度：第一宇宙速度 7.9 km/s，第二 11.2 km/s，第三 16.7 km/s。三级火箭的末速度已超过第一宇宙速度，可见分级的意义。

## 3.4 质心

选质心为基点，刚体的一般运动可以分解为随质心的平动与绕质心的转动。例如，在均匀重力场中抛出一块板、忽略空气阻力时，板上各点轨迹不同，而质心沿抛物线运动。

![](/course-materials/campus-basic-physics/figures/03-04.png)

**质心的位置**（$n$ 个质点组成的质点系）：

$$
\vec r_C=\frac{m_1\vec r_1+m_2\vec r_2+\cdots+m_i\vec r_i+\cdots}{m_1+m_2+\cdots+m_i+\cdots}=\frac{\sum_{i=1}^{n}m_i\vec r_i}{m'}
$$

分量式（质量离散分布）：

$$
x_C=\frac{\sum_i m_ix_i}{m'},\qquad y_C=\frac{\sum_i m_iy_i}{m'},\qquad z_C=\frac{\sum_i m_iz_i}{m'}
$$

质量连续分布：

$$
x_C=\frac{1}{m'}\int x\,\mathrm dm,\qquad y_C=\frac{1}{m'}\int y\,\mathrm dm,\qquad z_C=\frac{1}{m'}\int z\,\mathrm dm
$$

对密度均匀、形状对称的物体，**质心在其几何中心**。

### 例 3.4 水分子的质心

水分子中每个氢原子与氧原子中心距离均为 $d=1.0\times10^{-10}$ m，两条连线夹角 $\theta=104.6^\circ$。求分子质心。

解：取氧原子中心为原点，$x$ 轴沿键角平分线指向两氢原子之间，则上下对称，$y_C=0$。每个氢原子的横坐标为 $d\cos52.3^\circ=d\sin37.7^\circ$，因此

$$
x_C=\frac{\sum_i m_ix_i}{\sum_i m_i}=\frac{m_Hd\sin37.7^\circ+m_O\cdot0+m_Hd\sin37.7^\circ}{m_H+m_O+m_H}
$$

代入 $m_O=16m_H$、$\sin37.7^\circ=0.611$：

$$
x_C=\frac{2\times1.0\times10^{-10}\times0.611}{18}=6.8\times10^{-12}\ \mathrm{m}
$$

$$
\vec r_C=6.8\times10^{-12}\ \vec i\ \ (\mathrm{m})
$$

即质心在氧原子核与两氢连线中点之间、偏向氧原子一侧 0.068 Å 处。要点：求质心先选原点与对称轴，能利用对称性就直接令相应分量为零。

## 3.5 质心运动定理

由质心定义 $m'\vec r_C=\sum_i m_i\vec r_i$，两边对时间求一阶导数：

$$
m'\vec v_C=\sum_i m_i\vec v_i=\sum_i\vec p_i
$$

即**系统的总动量等于总质量乘以质心速度**。再求一阶导数：

$$
m'\vec a_C=\frac{\mathrm d\left(\sum_i\vec p_i\right)}{\mathrm dt}=\sum_i\frac{\mathrm d\vec p_i}{\mathrm dt}
$$

由质点系动量定理，$\sum_i\dfrac{\mathrm d\vec p_i}{\mathrm dt}=\sum_i\vec F_i^{\text{ex}}$，且 $\sum_i\vec F_i^{\text{in}}=0$，故

$$
\boxed{\ \vec F^{\text{ex}}=m'\frac{\mathrm d\vec v_C}{\mathrm dt}=m'\vec a_C\ }
$$

**质心运动定理**：作用在系统上的合外力等于系统的总质量乘以质心的加速度。

它的意义：

- 系统整体平动就像一个质量为 $m'$、位于质心的质点，只受外力支配；
- 当 $\vec F^{\text{ex}}=0$ 时 $\vec a_C=0$，质心做匀速直线运动（质心速度守恒）——爆炸、碰撞中"质心轨迹不变"的根据。

### 例 3.5 弹丸爆炸后碎片的落点

质量 $2m$ 的弹丸从地面斜抛出，在最高点爆炸成两个等质量碎片，一个竖直自由下落，另一个水平抛出，两者同时落地。问第二个碎片落点在哪？

![](/course-materials/campus-basic-physics/figures/03-05.png)

解：以全部碎片为系统，忽略空气阻力，合外力始终为总重力，因此质心继续沿原来的抛物线运动。取最高点正下方的地面点 $O$ 为横坐标原点，竖直下落碎片的落点为 $x_1=0$。设原弹丸应到达的落点相对 $O$ 的横坐标为 $x_C$，则两碎片同时落地时

$$
x_C=\frac{m_1x_1+m_2x_2}{m_1+m_2},\qquad m_1=m_2=m
$$

$$
x_C=\frac{0+m x_2}{2m}\ \Longrightarrow\ x_2=2x_C
$$

这里 $x_2=2x_C$ 的两个距离都从 $O$ 量起。若原弹丸从发射点出发的射程为 $R$，则 $x_C=R/2$，第二个碎片落在距发射点 $3R/2$ 处。质心位置公式可以直接求落点。

## 3.6 质点的角动量与角动量定理

### 3.6.1 角动量

设 $\vec r$ 是质点 $m$ 对参考点 $O$ 的位矢，定义质点相对 $O$ 的**角动量**

$$
\vec L=\vec r\times m\vec v
$$

大小

$$
L=rmv\sin\varphi
$$

其中 $\varphi$ 是 $\vec r$ 与 $\vec v$ 的夹角。方向按**右手螺旋法**：右手四指由 $\vec r$ 转向 $\vec v$（沿小于 $\pi$ 的角），拇指指向 $\vec L$。

![](/course-materials/campus-basic-physics/figures/03-06.png)

- 习惯上把 $\vec L$ 画在参考点 $O$ 上，表示"对该点的角动量"。
- 圆周运动时 $\varphi=90^\circ$，

$$
L=mvr=m\omega r^{2}
$$

- 角动量的定义也能描述**直线运动**的质点：设 $d$ 为参考点到速度所在直线的垂直距离（力臂），则

$$
L=mvr\sin\varphi=mvd
$$

速度直线不过参考点时，直线运动的质点对该点同样有角动量。

### 3.6.2 力矩

定义力 $\vec F$ 相对参考点 $O$ 的**力矩**

$$
\vec M=\vec r\times\vec F
$$

$$
M=|\vec r\times\vec F|=Fr\sin\varphi=rF_\perp=r_\perp F
$$

方向垂直于 $\vec r$、$\vec F$ 组成的平面（右旋关系）。

当 $\vec F\neq0$ 但 $\vec r=0$ 或 $\vec r\parallel\vec F$ 时必有 $\vec M=0$。特别地，**有心力（力沿位矢方向）对力心的力矩为零**——这是行星运动、中心力场问题中角动量守恒的根源。

### 3.6.3 质点的角动量定理

$$
\frac{\mathrm d\vec L}{\mathrm dt}=\frac{\mathrm d}{\mathrm dt}\left(\vec r\times\vec p\right)=\frac{\mathrm d\vec r}{\mathrm dt}\times\vec p+\vec r\times\frac{\mathrm d\vec p}{\mathrm dt}=\vec v\times\vec p+\vec r\times\vec F
$$

第一项 $\vec v\times\vec p=\vec v\times m\vec v=0$（共线矢量叉乘为零），第二项即 $\vec M$，所以

$$
\boxed{\ \vec M=\frac{\mathrm d\vec L}{\mathrm dt}\ }
$$

**质点的角动量定理**：质点所受的合力矩等于它的角动量的时间变化率。

两个限定条件：

- $\vec M$ 与 $\vec L$ 必须是**相对于同一参考点**而言；
- 这里的参考点 $O$ 固定在惯性系中，位矢与动量均在该惯性系中定义。

## 3.7 角动量守恒定律

**角动量守恒定律**：质点相对于某点所受的合力矩为零时，其对该点的角动量保持不变，

$$
\vec M=\frac{\mathrm d\vec L}{\mathrm dt}=0\ \Longrightarrow\ \vec L=\text{恒矢量}
$$

三条要点：

- 角动量是否守恒**与参考点的选取有关**（换一个点，力矩可能不为零）；
- 若 $\vec M\neq0$ 但 $\vec M$ 在某个方向的投影为零，则该方向上的角动量守恒（分量守恒）；
- 角动量守恒是宇宙中普遍成立的定律，宏观、微观都适用。

### 例 3.6 小孔细绳：角动量守恒的典型

光滑平台中央开一小孔，质量 $m$ 的小球用细线系住，线的另一端穿过小孔挂质量 $m_1$ 的重物，小球沿半径 $r_1$ 作匀速圆周运动时重物平衡。若在 $m_1$ 下方再挂 $m_2$，求重新平衡时的角速度 $\omega_2$、半径 $r_2$，以及小球能量的改变。

![](/course-materials/campus-basic-physics/figures/03-07.png)

解：平衡时绳的张力等于悬挂重物的重力，且提供向心力。前后两种平衡态：

$$
m_1g=m\omega_1^{2}r_1,\qquad (m_1+m_2)g=m\omega_2^{2}r_2
$$

绳的拉力始终沿位矢指向小孔，是**有心力**，对孔力矩为零，故小球对孔的角动量守恒：

$$
mr_1^{2}\omega_1=mr_2^{2}\omega_2\ \Longrightarrow\ r_1^{2}\omega_1=r_2^{2}\omega_2
$$

由第一式

$$
\omega_1=\sqrt{\frac{m_1g}{mr_1}}
$$

联立三式解得

$$
\omega_2=\left(\frac{m_1+m_2}{m_1}\right)^{\frac{2}{3}}\omega_1=\left(\frac{m_1+m_2}{m_1}\right)^{\frac{2}{3}}\sqrt{\frac{m_1g}{mr_1}}
$$

$$
r_2=\frac{m_1+m_2}{m\omega_2^{2}}g=\left(\frac{m_1}{m_1+m_2}\right)^{\frac{1}{3}}r_1
$$

比较前后两个匀速圆周运动状态，小球的能量变化就是其动能变化。其对孔的角动量在半径变化过程中保持不变，但张力可对小球做功。

$$
\Delta E=\frac{1}{2}mv_2^{2}-\frac{1}{2}mv_1^{2}=\frac{1}{2}m\left(r_2\omega_2\right)^{2}-\frac{1}{2}m\left(r_1\omega_1\right)^{2}
$$

$$
=\frac{1}{2}mr_1^{2}\omega_1^{2}\left[\left(\frac{r_1}{r_2}\right)^{2}-1\right]=\frac{1}{2}mr_1^{2}\omega_1^{2}\left[\left(\frac{m_1+m_2}{m_1}\right)^{\frac{2}{3}}-1\right]
$$

角动量守恒只保证 $r^{2}\omega$ 不变。半径减小时角速度、动能增加，增加的动能来自张力做功。上述结果比较的是两个平衡的匀速圆周运动状态；若突然加挂重物且完全没有耗散，径向运动还可能持续振荡，最终稳定需要相应的调节或耗散过程。

### 例 3.7 平抛运动中的重力矩

质量 $m$ 的质点以初速 $v_0$ 平抛，求质点所受重力对抛出点 $O$ 的力矩。

解：取抛出点为原点，$x$ 轴水平、$y$ 轴竖直向下：

$$
\vec v=v_0\vec i+gt\vec j,\qquad \vec r=v_0t\vec i+\frac{1}{2}gt^{2}\vec j
$$

$$
\vec L=\vec r\times m\vec v=\left(v_0t\vec i+\frac{1}{2}gt^{2}\vec j\right)\times m\left(v_0\vec i+gt\vec j\right)
$$

展开（$\vec i\times\vec i=\vec j\times\vec j=0$，$\vec i\times\vec j=\vec k$，$\vec j\times\vec i=-\vec k$）：

$$
\vec L=m\left(v_0t\,gt-\frac{1}{2}gt^{2}v_0\right)\vec k=\frac{1}{2}mgv_0t^{2}\vec k
$$

$$
\vec M=\frac{\mathrm d\vec L}{\mathrm dt}=mgv_0t\,\vec k
$$

要点：重力是恒力，但力臂随时间增大（$r_\perp=v_0t$），所以力矩 $M=mgv_0t$ 随时间线性增大，角动量按 $t^{2}$ 增长。用角动量定理求力矩，比"找力臂再叉乘"更省事。

## 3.8 质点系角动量定理与开普勒第二定律

对第 $i$ 个质点：

$$
\frac{\mathrm d\vec L_i}{\mathrm dt}=\vec r_i\times\left(\vec F_i+\vec f_i\right)
$$

对整个质点系求和：

$$
\frac{\mathrm d}{\mathrm dt}\sum_i\vec L_i=\sum_i\left[\vec r_i\times\left(\vec F_i+\vec f_i\right)\right]=\sum_i\vec r_i\times\vec F_i+\sum_i\vec r_i\times\vec f_i
$$

第二项是内力矩之和。由牛顿第三定律，内力成对且沿同一直线，$\sum_i\vec r_i\times\vec f_i=0$。故

$$
\frac{\mathrm d\vec L}{\mathrm dt}=\vec M_{\text{合外}},\qquad \vec L=\sum_i\vec L_i
$$

**质点系角动量定理**：系统角动量的时间变化率等于外力矩之和。当 $\vec M_{\text{合外}}=0$ 时，

$$
\vec L=\sum_i\vec L_i=\text{恒矢量}
$$

注意：**内力矩可以使角动量在系统内质点间转移，但不能改变整个系统的角动量**。这与"内力不改变总动量"完全平行。

### 例 3.8 开普勒第二定律的证明

行星到恒星的矢径在相等时间内扫过的面积相等。用角动量守恒证明。

![](/course-materials/campus-basic-physics/figures/03-08.png)

解：$\Delta t$ 时间内矢径扫过的面积近似为三角形面积：

$$
\Delta A=\frac{1}{2}rl=\frac{1}{2}r\left|\Delta\vec r\right|\sin\alpha=\frac{1}{2}r\cdot v\Delta t\sin\alpha
$$

其中 $\left|\Delta\vec r\right|=\Delta s=v\Delta t$（$\Delta t$ 很小时弦长≈弧长）。把 $mrv\sin\alpha=L$ 代入：

$$
\Delta A=\frac{1}{2}\frac{mrv\sin\alpha}{m}\Delta t=\frac{L}{2m}\Delta t
$$

行星作**有心运动**（受恒星的万有引力指向恒星），对恒星的力矩为零，故 $L=mrv\sin\alpha$ 为不变量。于是

$$
\frac{\Delta A_1}{\Delta t_1}=\frac{\Delta A_2}{\Delta t_2}\ \Longrightarrow\ \Delta t_1=\Delta t_2\ \text{时}\ \Delta A_1=\Delta A_2
$$

即面速度 $\dfrac{\mathrm dA}{\mathrm dt}=\dfrac{L}{2m}$ 为常量，得证。

要点：开普勒第二定律本质是**角动量守恒的几何表述**，守恒量 $L$ 直接给出"面积速度"常数。

## 本章要点

- 冲量是过程量、矢量；动量定理 $\vec I=\vec p_2-\vec p_1$ 是矢量式，方向变化时必须用矢量差，不能只算大小。
- 动量严格守恒要求合外力始终为零；某方向的外力分量始终为零时，该方向动量守恒。短暂过程中的近似守恒要检查外力总冲量能否忽略。
- 系统内力不改变总动量，也不能改变总角动量；但内力可以做功、可以改变动能。
- "人走车"类问题的通用套路：动量守恒 → 速度比 → 对时间积分 → 位移比，且 $mx+MX=0$（质心不动）。
- 质心运动定理 $\vec F^{\text{ex}}=m'\vec a_C$：系统整体像位于质心的一个质点；合外力为零时质心速度不变，爆炸、碰撞中"质心轨迹不变"由此而来。
- 角动量 $\vec L=\vec r\times m\vec v$ 依赖参考点；角动量守恒也与参考点选取有关，但有心力对力心必守恒。
- 角动量守恒只保证 $r^{2}\omega$ 不变，不保证动能不变（例 3.6 中半径减小、动能增大）。
- 力矩为零的两种典型：$\vec r=0$（力过参考点）与 $\vec r\parallel\vec F$（有心力）。

## 原始资料

- 第3章1-5节 动量 动量守恒 质心运动定理.pdf（28 页）
- 第3章6-9节 角动量 角动量定理 角动量守恒.pdf（10 页，实际只讲到 §3.8）
