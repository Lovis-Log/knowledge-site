---
slug: "01-kinematics"
title: "质点运动学"
summary: "参考系、位矢、速度和加速度，以及圆周运动与相对运动。"
updatedAt: "2026-11-19"
content_type: "reference"
group: "course"
displayNumber: "01"
tags: ["基础物理"]
sources: [{"kind": "article", "title": "第1章1-4节 参考系 坐标系 时间 位置矢量 位移 速度 加速度（1）.pdf", "url": "https://drive.google.com/file/d/1T2WEj-tKgpGo17VY-RDOJgzBsaNU1zJ3/view?usp=drivesdk"}, {"kind": "article", "title": "第1章1-4节 参考系 坐标系 时间 位置矢量 位移 速度 加速度.pdf", "url": "https://drive.google.com/file/d/1eu5pMNfDnCDPqAdoTcJW_iqRu6HLNFWN/view?usp=drivesdk"}, {"kind": "article", "title": "第1章6节 圆周运动 测量.pdf", "url": "https://drive.google.com/file/d/1L2KATmTk6t3-g-KDB9PkkRdxb_fXN94O/view?usp=drivesdk"}, {"kind": "article", "title": "第1章7节 运动学两类基本问题 相对运动1.pdf", "url": "https://drive.google.com/file/d/1JaVCjpYO6_cJdM56iswEqlIHnO16CL-t/view?usp=drivesdk"}]
---

## 1.0 力学的研究对象与模型

力学研究物体的**机械运动**，即物体之间相对位置随时间发生变化的过程。基本形式分**平动**（物体上任一直线始终保持平行）与**转动**（各点绕同一轴作圆周运动）。

课程只用两个理想模型：

- **质点**：只有质量、没有大小和形状的力学研究对象。物体能否看成质点取决于研究问题的性质，而不是物体本身的尺寸——地球公转时可作质点，研究自转时不能。
- **刚体**：任何情况下大小和形状都不发生变化的力学研究对象（第 5 章使用）。

质点运动学的任务：给定参考系后，用位置、位移、速度、加速度描述点的运动，并反过来由加速度求运动方程。

## 1.1 参考系与时间

**参考系**是描述运动时选定的标准物体；**坐标系**是参考系上建立的数学框架（直角坐标、自然坐标、极坐标等）。同一运动在不同参考系中的描述不同，这就是 §1-7 要处理的问题。

描述运动时，时刻表示某一瞬间，时间间隔 $\Delta t=t_2-t_1$ 表示两时刻之间的持续时间。时间计量以秒为单位。

- **秒**：铯 133 原子基态两个超精细能级在零磁场中跃迁辐射振荡 9 192 631 770 周所持续的时间。
- 以 2015 年的课堂数据为例，铯原子钟约 500 万年相差 1 s，锶原子光晶格钟的相对不确定度达 $2.3\times10^{-16}$，约相当于 1.38 亿年相差 1 s。

课堂中的数量级例子包括太阳质量约 $2.0\times10^{30}$ kg、地球质量约 $6.0\times10^{24}$ kg、电子静质量约 $9.1\times10^{-31}$ kg。真空光速为 $2.99792458\times10^{8}$ m/s，地表重力加速度约为 9.8 m/s²，汽车急刹车的加速度大小约为 8 m/s²。这些数值有助于检查计算结果的量级。

## 1.2 位矢 位移 速度

### 1.2.1 位置矢量（位矢）与运动方程

抛体运动可以写成两个分量式

$$
\begin{cases}
x=v_0\cos\theta_0\,t\\
y=v_0\sin\theta_0\,t-\dfrac{1}{2}gt^{2}
\end{cases}
$$

更简洁的写法是用一个矢量概括位置。**位置矢量**是从参考点（坐标原点 $O$）指向质点所在位置 $P$ 的有向线段，记 $\vec r=\overrightarrow{OP}$。它随时间 $t$ 变化：

$$
\vec r=\vec r(t)
$$

直角坐标系中写成三个标量方程并合成

$$
\begin{cases}
x=x(t)\\
y=y(t)\\
z=z(t)
\end{cases}
\qquad
\vec r=x(t)\,\vec i+y(t)\,\vec j+z(t)\,\vec k
$$

这三个分量式称为**运动方程**——质点位置与时间的关系式。

位矢的大小与方向：

$$
r=|\vec r|=\sqrt{x^{2}+y^{2}+z^{2}}
$$

$$
\cos\alpha=\frac{x}{r},\qquad \cos\beta=\frac{y}{r},\qquad \cos\gamma=\frac{z}{r}
$$

$$
\cos^{2}\alpha+\cos^{2}\beta+\cos^{2}\gamma=1
$$

其中 $\alpha,\beta,\gamma$ 是 $\vec r$ 与三个坐标轴正方向的夹角。方向余弦的正负与相应坐标分量一致，三个方向余弦共同确定矢量方向。$r=0$ 时方向角无定义。

**例 1.1（由运动方程求轨迹）** 已知 $\vec r=\left[(20t^{2}-4)\vec i+15t^{2}\vec j\right]$ cm，求轨迹。

解：两个分量式为 $x=20t^{2}-4$，$y=15t^{2}$。消去 $t$：

$$
\frac{x+4}{20}=\frac{y}{15}\ \Longrightarrow\ 3x-4y+12=0
$$

轨迹是一条直线，起点 $(x,y)=(-4,0)$ 对应 $t=0$，随 $t$ 增大运动到 $(0,3)$ 方向，如图中自左下向右上。

### 1.2.2 位移

**位移**：质点从 $a$ 运动到 $b$ 时，由 $a$ 指向 $b$ 的有向线段，记 $\Delta\vec r$。它反映位置的变化，与路径无关。

$$
\Delta\vec r_{ab}=\vec r_b-\vec r_a=(x_b-x_a)\vec i+(y_b-y_a)\vec j+(z_b-z_a)\vec k=\Delta x\,\vec i+\Delta y\,\vec j+\Delta z\,\vec k
$$

$$
|\Delta\vec r|=\sqrt{\Delta x^{2}+\Delta y^{2}+\Delta z^{2}}
$$

$$
\alpha=\arccos\frac{\Delta x}{|\Delta\vec r|},\qquad \beta=\arccos\frac{\Delta y}{|\Delta\vec r|},\qquad \gamma=\arccos\frac{\Delta z}{|\Delta\vec r|}
$$

**位移与路程的区别（易错点）** 设质点沿曲线从 $p_1$ 到 $p_2$：

![](/course-materials/campus-basic-physics/figures/01-01.png)

- **位移** $\Delta\vec r=\vec r_2-\vec r_1$ 是矢量；**位移的大小** $|\Delta\vec r|=|\vec r_2-\vec r_1|$ 是弦长 $p_1p_2$。
- **路程** $\Delta s$ 是标量，等于实际运动路径的弧长 $\widehat{p_1p_2}$。
- **位矢大小的改变量** $\Delta r=|\vec r_2|-|\vec r_1|$，它比较两端到原点的距离，可正、可负，也可为零。

三者关系为

$$
\Delta s\ge|\Delta\vec r|\ge\bigl|\Delta r\bigr|
$$

第二个不等式是反三角不等式。第一个等号要求沿直线单向运动；第二个等号要求两个端点的位矢共线且同向（包括某个端点位于原点的情形）。沿远离原点的径向直线单向运动时，才有 $\Delta s=|\Delta\vec r|=\Delta r$。

### 1.2.3 速度

**平均速度**是位移与时间之比，方向沿 $\Delta\vec r$：

$$
\bar{\vec v}=\frac{\Delta\vec r}{\Delta t},\qquad |\bar{\vec v}|=\frac{|\Delta\vec r|}{\Delta t}
$$

**平均速率**是路程与时间之比，是标量：

$$
\bar v=\frac{\Delta s}{\Delta t}
$$

两者**不能混用**。质点沿半径 $a$ 的圆周运动一周：

$$
\Delta\vec r=0\ \Rightarrow\ \bar{\vec v}=0,\qquad \Delta s=2\pi a\ \Rightarrow\ \bar v=\frac{2\pi a}{\Delta t}\neq 0
$$

**瞬时速度（速度）**是 $\Delta t\to0$ 时平均速度的极限：

$$
\vec v=\lim_{\Delta t\to0}\frac{\Delta\vec r}{\Delta t}=\frac{\mathrm d\vec r}{\mathrm dt}
$$

直角坐标分量式

$$
\vec v=\frac{\mathrm d\vec r}{\mathrm dt}=\frac{\mathrm dx}{\mathrm dt}\vec i+\frac{\mathrm dy}{\mathrm dt}\vec j+\frac{\mathrm dz}{\mathrm dt}\vec k=v_x\vec i+v_y\vec j+v_z\vec k
$$

$$
v=|\vec v|=\sqrt{v_x^{2}+v_y^{2}+v_z^{2}}=\sqrt{\left(\frac{\mathrm dx}{\mathrm dt}\right)^{2}+\left(\frac{\mathrm dy}{\mathrm dt}\right)^{2}+\left(\frac{\mathrm dz}{\mathrm dt}\right)^{2}}
$$

$$
\cos\alpha=\frac{v_x}{v},\qquad \cos\beta=\frac{v_y}{v},\qquad \cos\gamma=\frac{v_z}{v}
$$

速度方向：$\Delta t\to0$ 时 $\Delta\vec r$ 的极限方向，即**轨迹的切线方向**，指向运动前进的一侧（自然坐标中就是 $\vec\tau$ 的方向）。速度反映质点在某时刻、某位置的运动状态。

**瞬时速率**

$$
v=\lim_{\Delta t\to0}\frac{\Delta s}{\Delta t}=\frac{\mathrm ds}{\mathrm dt}
$$

- 一般情形 $|\bar{\vec v}|\neq\bar v$：平均速度大小是弦长除以时间，平均速率是弧长除以时间。
- 但取极限后 $\left|\dfrac{\mathrm d\vec r}{\mathrm dt}\right|=\dfrac{\mathrm ds}{\mathrm dt}$，即

$$
|\vec v|=v
$$

因此常把速度的大小直接称为速率。

## 1.3 加速度

**平均加速度**是速度增量与时间之比，方向沿 $\Delta\vec v$：

$$
\bar{\vec a}=\frac{\vec v_2-\vec v_1}{t_2-t_1}=\frac{\Delta\vec v}{\Delta t}
$$

**瞬时加速度（加速度）**：

$$
\vec a=\lim_{\Delta t\to0}\frac{\Delta\vec v}{\Delta t}=\frac{\mathrm d\vec v}{\mathrm dt}=\frac{\mathrm d^{2}\vec r}{\mathrm dt^{2}}
$$

方向为 $\Delta\vec v$ 的极限方向。加速度反映速度矢量改变的快慢。在速率非零且曲率非零处，加速度有指向轨迹凹侧的法向分量，还可能有与速度同向或反向的切向分量。

直角坐标分量：

$$
\vec a=\frac{\mathrm d v_x}{\mathrm dt}\vec i+\frac{\mathrm d v_y}{\mathrm dt}\vec j+\frac{\mathrm d v_z}{\mathrm dt}\vec k=a_x\vec i+a_y\vec j+a_z\vec k
$$

$$
a_x=\frac{\mathrm d v_x}{\mathrm dt}=\frac{\mathrm d^{2}x}{\mathrm dt^{2}},\qquad a_y=\frac{\mathrm d v_y}{\mathrm dt}=\frac{\mathrm d^{2}y}{\mathrm dt^{2}},\qquad a_z=\frac{\mathrm d v_z}{\mathrm dt}=\frac{\mathrm d^{2}z}{\mathrm dt^{2}}
$$

$$
a=|\vec a|=\sqrt{a_x^{2}+a_y^{2}+a_z^{2}}=\sqrt{\left(\frac{\mathrm d^{2}x}{\mathrm dt^{2}}\right)^{2}+\left(\frac{\mathrm d^{2}y}{\mathrm dt^{2}}\right)^{2}+\left(\frac{\mathrm d^{2}z}{\mathrm dt^{2}}\right)^{2}}
$$

**思考题（辨析）** 质点作曲线运动时，下面四式的正误：

| 式子 | 判断 | 理由 |
|---|---|---|
| $\|\Delta\vec r\|=\Delta r$ | ✗ | 左边是弦长，右边是两端到原点距离之差 |
| $\Delta s=\Delta\|\vec r\|$ | ✗ | 路程与位矢大小的改变量一般不同 |
| $\Delta s=\Delta r$ | ✗ | 同上 |
| $\Delta s=\|\Delta\vec r\|$ | ✗ | 一般弧长大于弦长 |
| $\Delta\|\vec r\|=\Delta r$ | ✓ | 两者都是"位矢大小之差" |

对运动方程 $x=3+2t-4t^{3}$：$v=2-12t^{2}$，$a=-24t$。因为 $a$ 随时间变化，**不是匀加速**；$t>0$ 时 $a<0$，所以是"变加速直线运动，加速度为负"。判断匀/变加速看 $a$ 是否为常量，判断加速/减速看 $a$ 与 $v$ 是否同号，两者不能混为一谈。

## 1.4 运动学两类基本问题

运动学的全部问题可归为两类：

1. **已知运动方程 $\vec r(t)$，求速度、加速度**——逐次求导；
2. **已知加速度（或速度）及初始条件，求速度、运动方程**——积分并代入初值。

解题顺序固定为：选坐标系 → 写分量式 → 求导或积分 → 代初值 → 讨论符号与物理意义。

### 例 1.2 匀加速直线运动（第二类问题的标准解法）

已知加速度大小 $a$ 为常量，求运动方程及速度与位移的关系。

解：一维运动可用标量代替矢量，

$$
\vec a=\frac{\mathrm d\vec v}{\mathrm dt}\ \Rightarrow\ \mathrm dv=a\,\mathrm dt
$$

$$
\int_{v_0}^{v}\mathrm dv=\int_{0}^{t}a\,\mathrm dt\ \Rightarrow\ v=v_0+at
$$

再由速度定义

$$
\frac{\mathrm dx}{\mathrm dt}=v_0+at\ \Rightarrow\ \mathrm dx=(v_0+at)\mathrm dt
$$

$$
\int_{x_0}^{x}\mathrm dx=\int_{0}^{t}(v_0+at)\mathrm dt\ \Rightarrow\ x=x_0+v_0t+\frac{1}{2}at^{2}
$$

消去 $t$ 得

$$
v^{2}=v_0^{2}+2a(x-x_0)
$$

### 例 1.3 加速度随时间均匀增加

质点由静止开始作直线运动，初始加速度为 $a_0$，以后加速度均匀增加，每经过 $\tau$ 秒增加 $a_0$。求经过 $t$ 秒后的速度和走过的距离。

解：由题意先写出加速度的时间关系（直线运动，用标量）：

$$
a=a_0+\frac{a_0}{\tau}t
$$

两次积分：

$$
v=\int_{0}^{t}a\,\mathrm dt=\int_{0}^{t}\left(a_0+\frac{a_0}{\tau}t\right)\mathrm dt=a_0t+\frac{a_0}{2\tau}t^{2}
$$

$$
x=\int_{0}^{t}v\,\mathrm dt=\int_{0}^{t}\left(a_0t+\frac{a_0}{2\tau}t^{2}\right)\mathrm dt=\frac{a_0}{2}t^{2}+\frac{a_0}{6\tau}t^{3}
$$

要点：这里 $a$ 不是常量，不能套用 $v^2-v_0^2=2as$；只能用 $\mathrm dv=a\,\mathrm dt$ 与 $\mathrm dx=v\,\mathrm dt$ 逐次积分。

### 例 1.4 课堂练习：由运动方程分析运动

已知 $x=6+3t-3t^{2}$（SI），求 (1) 第一秒末的速度和加速度；(2) 分析运动情况；(3) 第一秒内的位移和平均速度；(4) 第一秒内经过的路程。

解：

(1)

$$
v=\frac{\mathrm dx}{\mathrm dt}=3-6t,\qquad a=\frac{\mathrm d^{2}x}{\mathrm dt^{2}}=-6
$$

$$
v\big|_{t=1}=-3\ \text{m/s},\qquad a\big|_{t=1}=-6\ \text{m/s}^{2}
$$

(2) 令 $v=0$ 得转向时刻 $t=0.5$ s，此时 $x=6.75$ m。于是

- $t<0.5$ s：$v>0$、$a<0$，$v$ 与 $a$ 反向，**匀减速**；
- $t>0.5$ s：$v<0$、$a<0$，$v$ 与 $a$ 同向，**匀加速**（沿 $-x$ 方向越来越快）。

(3) 位移只看首末位置，与中途转向无关：

$$
\Delta x=x_1-x_0=(6+3-3)-6=0,\qquad |\bar v|=\frac{\Delta x}{\Delta t}=0
$$

(4) 路程要按转向点分段累加：

$$
\Delta s=|x_{0.5}-x_0|+|x_1-x_{0.5}|=0.75+0.75=1.5\ \text{m}
$$

易错点：第 (3) 问位移为零、平均速度为零，但第 (4) 问路程不为零。凡是"求路程"，必须先检查区间内 $v$ 是否变号。

### 例 1.5 拉船靠岸（几何约束型运动学）

在离水面高度为 $h$ 的岸边，有人用绳子拉船靠岸。若人以匀速 $v_0$ 收绳，求船在离岸边 $x$ 远处的速率。

![](/course-materials/campus-basic-physics/figures/01-02.png)

解：忽略船高与滑轮高，由图得几何约束

$$
x=\sqrt{l^{2}-h^{2}}
$$

对时间求导（$h$ 为常量，$l=l(t)$）：

$$
v=\frac{\mathrm dx}{\mathrm dt}=\frac{l}{\sqrt{l^{2}-h^{2}}}\frac{\mathrm dl}{\mathrm dt}=\frac{\sqrt{x^{2}+h^{2}}}{x}\frac{\mathrm dl}{\mathrm dt}
$$

设 $t=0$ 时 $l=l_0$，绳长以速率 $v_0$ 缩短，则 $l=l_0-v_0t$，$\dfrac{\mathrm dl}{\mathrm dt}=-v_0$，故

$$
v=-\frac{\sqrt{x^{2}+h^{2}}}{x}v_0=-v_0\sqrt{\left(\frac{h}{x}\right)^{2}+1}
$$

负号表示船沿 $-x$ 方向运动（向岸靠近）。船的速率为 $|v|=v_0\sqrt{1+(h/x)^2}$。

**为什么船速大于收绳速率？** 对 $h>0$、$x>0$，有 $|v|/v_0=\sqrt{1+(h/x)^2}>1$。同样的绳长缩短量对应更大的水平位移。$x\to0$ 时，这个理想模型给出的速率趋于无穷，说明恒速收绳、船保持水平运动等假设不能一直延续到 $x=0$。

## 1.6 圆周运动

圆周运动用**自然坐标系**描述：在轨迹上取一点 $P$，$\vec\tau$ 为切线方向单位矢量（指向运动前进方向），$\vec n$ 为法线方向单位矢量（指向曲线**凹侧**）。

![](/course-materials/campus-basic-physics/figures/01-03.png)

### 1.6.1 切向加速度与法向加速度

速度只有切向分量：

$$
\vec v=v\vec\tau
$$

求导时要注意 $\vec\tau$ 也是变的：

$$
\vec a=\frac{\mathrm d\vec v}{\mathrm dt}=\frac{\mathrm dv}{\mathrm dt}\vec\tau+v\frac{\mathrm d\vec\tau}{\mathrm dt}
$$

图中 $\Delta\vec\tau=\vec\tau_2-\vec\tau_1$ 的大小为 $|\Delta\tau|=|\vec\tau|\Delta\theta=\Delta\theta$（单位矢量长度不变，只有方向转），方向沿 $\vec n$。因此

$$
\mathrm d\vec\tau=\mathrm d\theta\,\vec n
$$

$$
\frac{\mathrm d\vec\tau}{\mathrm dt}=\frac{\mathrm d\theta}{\mathrm dt}\vec n=\frac{\mathrm d\theta}{\mathrm ds}\frac{\mathrm ds}{\mathrm dt}\vec n=\frac{1}{\rho}v\,\vec n
$$

其中 $\rho$ 为**曲率半径**（$\mathrm ds=\rho\,\mathrm d\theta$）。于是

$$
\boxed{\ \vec a=\frac{\mathrm dv}{\mathrm dt}\vec\tau+\frac{v^{2}}{\rho}\vec n=a_\tau\vec\tau+a_n\vec n\ }
$$

$$
\boxed{\ a_\tau=\frac{\mathrm dv}{\mathrm dt},\qquad a_n=\frac{v^{2}}{\rho}\ }
$$

物理意义：

- $a_\tau$ 改变**速率**（速度大小）：$a_\tau>0$ 加速，$a_\tau<0$ 减速，$a_\tau=0$ 速率不变；
- $a_n$ 改变**速度方向**：恒指向曲线凹侧，速率不变的曲线运动也有 $a_n\neq0$。

![](/course-materials/campus-basic-physics/figures/01-04.png)

总加速度大小与它同速度的夹角：

$$
a=\sqrt{a_n^{2}+a_\tau^{2}}=\sqrt{\left(\frac{\mathrm dv}{\mathrm dt}\right)^{2}+\left(\frac{v^{2}}{\rho}\right)^{2}}
$$

$$
\varphi=\arctan\frac{a_n}{a_\tau}
$$

$\varphi$ 是 $\vec a$ 与 $\vec v$ 的夹角。按 $\varphi$ 判断运动性质：

| $\varphi$ | $a_\tau$ | 速率 |
|---|---|---|
| $0\le\varphi<\dfrac{\pi}{2}$ | $a_\tau>0$ | $v$ 增大 |
| $\varphi=90^\circ$ | $a_\tau=0$ | $v$ 不变（匀速率曲线运动） |
| $\dfrac{\pi}{2}<\varphi\le\pi$ | $a_\tau<0$ | $v$ 减小 |

注意 $\varphi$ 的定义域取 $[0,\pi]$，用 $\arctan(a_n/a_\tau)$ 计算时若 $a_\tau<0$ 需补 $\pi$；图中给出的是锐角与钝角两种典型情形，不要只看公式数值。

### 例 1.6 绳绕滑轮

半径为 $R$ 的滑轮可绕中心轴转动，绕在轮上的无形变细绳下端挂一重物，重物按 $h=\dfrac{1}{2}a_1t^{2}$ 的规律下降。求轮沿上任一点 $P$ 的加速度（绳与轮间无相对滑动）。

解：无滑动意味着绳上各点与轮沿对应点速度、切向加速度相同，故 $P$ 点的弧长坐标满足

$$
s=s_0+\frac{1}{2}a_1t^{2}
$$

$$
v=\frac{\mathrm ds}{\mathrm dt}=a_1t
$$

$$
\vec a_n=\frac{v^{2}}{R}\vec n=\frac{a_1^{2}t^{2}}{R}\vec n,\qquad \vec a_\tau=\frac{\mathrm dv}{\mathrm dt}\vec\tau=a_1\vec\tau
$$

$$
\vec a=\vec a_n+\vec a_\tau=\frac{a_1^{2}t^{2}}{R}\vec n+a_1\vec\tau
$$

要点：$a_\tau$ 是常量（等于重物加速度），$a_n$ 随 $t^{2}$ 增长；$P$ 点总加速度的大小与方向都随时间变化。

### 1.6.2 角量与线量

圆周运动也可以只用角度描述。

1. **角位置（角坐标）** $\theta$：通常规定**逆时针为正**，单位 rad（无量纲）。运动方程 $\theta=\theta(t)$。
2. **角位移** $\Delta\theta=\theta_2-\theta_1$。
3. **角速度**：

$$
\bar\omega=\frac{\Delta\theta}{\Delta t},\qquad \omega=\frac{\mathrm d\theta}{\mathrm dt}
$$

方向由**右手螺旋**定则确定：右手四指沿转动方向弯曲，拇指指向 $\vec\omega$。

4. **角加速度**：

$$
\bar{\vec\alpha}=\frac{\Delta\vec\omega}{\Delta t},\qquad \vec\alpha=\frac{\mathrm d\vec\omega}{\mathrm dt},\qquad \alpha=\frac{\mathrm d\omega}{\mathrm dt}=\frac{\mathrm d^{2}\theta}{\mathrm dt^{2}}
$$

方向：$\Delta t\to0$ 时 $\Delta\vec\omega$ 的极限方向。$\omega$ 增大时 $\vec\alpha$ 与 $\vec\omega$ 同向，$\omega$ 减小时反向。

**角量与线量的关系**（$s$ 从同一基准点沿弧长量起）：

以下先考虑沿选定正方向转动的情形。发生反向运动时，带符号的切向速度满足 $v_\tau=R\omega$，速率满足 $v=R|\omega|$，应区分两者。

$$
s=R\theta\ \Rightarrow\ v=\frac{\mathrm ds}{\mathrm dt}=R\frac{\mathrm d\theta}{\mathrm dt}=R\omega
$$

$$
a_\tau=\frac{\mathrm dv}{\mathrm dt}=R\frac{\mathrm d\omega}{\mathrm dt}=R\alpha,\qquad a_n=\frac{v^{2}}{R}=\omega^{2}R
$$

$$
a=\sqrt{a_\tau^{2}+a_n^{2}}=R\sqrt{\alpha^{2}+\omega^{4}},\qquad \varphi=\arctan\frac{a_n}{a_\tau}
$$

### 例 1.7 匀角加速转动

刚体以恒定角加速度 $\alpha$ 转动，$t=0$ 时 $\theta=\theta_0$、$\omega=\omega_0$，求其上某质元 $A$ 的运动方程。

解：由 $\alpha=\dfrac{\mathrm d\omega}{\mathrm dt}$ 得 $\mathrm d\omega=\alpha\,\mathrm dt$，积分

$$
\omega=\omega_0+\alpha t
$$

再由 $\omega=\dfrac{\mathrm d\theta}{\mathrm dt}$，即 $\mathrm d\theta=(\omega_0+\alpha t)\mathrm dt$，积分

$$
\theta=\theta_0+\omega_0t+\frac{1}{2}\alpha t^{2}
$$

消去 $t$ 得

$$
\omega^{2}-\omega_0^{2}=2\alpha(\theta-\theta_0)
$$

与匀变速直线运动一一对应：

| 匀角加速转动（$\alpha$ 常量） | 匀变速直线运动（$a$ 常量） |
|---|---|
| $\omega=\omega_0+\alpha t$ | $v=v_0+at$ |
| $\theta=\theta_0+\omega_0t+\frac{1}{2}\alpha t^{2}$ | $s=s_0+v_0t+\frac{1}{2}at^{2}$ |
| $\omega^{2}-\omega_0^{2}=2\alpha(\theta-\theta_0)$ | $v^{2}-v_0^{2}=2a(s-s_0)$ |

### 例 1.8 变速圆周运动

质点沿半径 $R$ 的圆周按 $s=v_0t-\dfrac{1}{2}kt^{2}$ 运动，$v_0$、$k$ 为正数。求 (1) $t$ 时刻总加速度大小；(2) $t$ 为何值时总加速度大小为 $k$；(3) 此时质点运行的圈数。

解：设 $t=0$ 时质点在 $s=0$ 的 $P$ 点。

(1)

$$
a_\tau=\frac{\mathrm dv}{\mathrm dt}=\frac{\mathrm d^{2}s}{\mathrm dt^{2}}=-k,\qquad a_n=\frac{v^{2}}{R}=\frac{(v_0-kt)^{2}}{R}
$$

$$
a=\sqrt{a_\tau^{2}+a_n^{2}}=\frac{\sqrt{(v_0-kt)^{4}+(kR)^{2}}}{R}
$$

(2) 令 $a=k$：

$$
\frac{\sqrt{(v_0-kt)^{4}+(kR)^{2}}}{R}=k\ \Rightarrow\ (v_0-kt)^{4}=0\ \Rightarrow\ t=\frac{v_0}{k}
$$

(3) 此时 $t=v_0/k$，路程

$$
s=v_0t-\frac{1}{2}kt^{2}=\frac{v_0^{2}}{2k}
$$

$$
n=\frac{s}{2\pi R}=\frac{v_0^{2}}{4\pi Rk}
$$

要点：$a_\tau$ 恒为 $-k$（匀减速），$a_n$ 随速率减小而减小；当速率降为零时 $a_n=0$，总加速度恰好等于 $|a_\tau|=k$。

## 1.7 相对运动

运动具有相对性，同一质点在不同参考系中的位矢、速度不同。以下设 $S'$ 相对 $S$ 仅作平动，两坐标系的对应轴始终平行，且采用同一时间变量。

![](/course-materials/campus-basic-physics/figures/01-05.png)

### 1.7.1 伽利略坐标变换

$$
\vec r=\vec r'+\vec R
$$

$\vec R$ 是 $S'$ 系原点相对 $S$ 系原点的位矢，称**牵连位矢**；$\vec r$ 称**绝对位矢**（质点在 $S$ 中的位矢），$\vec r'$ 称**相对位矢**（质点在 $S'$ 中的位矢）。

### 1.7.2 速度与加速度变换

对时间求导：

$$
\frac{\mathrm d\vec r}{\mathrm dt}=\frac{\mathrm d\vec r'}{\mathrm dt}+\frac{\mathrm d\vec R}{\mathrm dt}
$$

$$
\vec v_{\text{绝对}}=\vec v_{\text{相对}}+\vec v_{\text{牵连}}
$$

再求导：

$$
\frac{\mathrm d^{2}\vec r}{\mathrm dt^{2}}=\frac{\mathrm d^{2}\vec r'}{\mathrm dt^{2}}+\frac{\mathrm d^{2}\vec R}{\mathrm dt^{2}}\ \Rightarrow\ \vec a_{\text{绝对}}=\vec a_{\text{相对}}+\vec a_{\text{牵连}}
$$

当 $S'$ 相对 $S$ 作**匀速直线运动**时 $\vec a_{\text{牵连}}=0$，于是

$$
\vec a_{\text{绝对}}=\vec a_{\text{相对}}
$$

这就是**伽利略相对性原理**：在彼此作匀速直线运动的所有惯性参照系中，物体的加速度相等，因而各种力学规律相同（牛顿定律在所有惯性系中形式相同）。

### 例 1.9 雨滴相对车窗的速度

雨滴以速率 $v$ 竖直落到静止的车窗上。当车相对地面以速率 $v_0$ 向西行驶时，车上的人观测到的雨速如何？

![](/course-materials/campus-basic-physics/figures/01-06.png)

解：取地面为 $S$ 系，车为 $S'$ 系。已知

$$
\vec v_{\text{雨地}}=\vec v_{\text{绝对}}=\vec v\ (\text{竖直向下}),\qquad \vec v_{\text{车地}}=\vec v_{\text{牵连}}=\vec v_0\ (\text{向西})
$$

所求为 $\vec v_{\text{雨车}}=\vec v_{\text{相对}}$。由速度变换

$$
\vec v_{\text{雨车}}=\vec v_{\text{雨地}}-\vec v_{\text{车地}}
$$

即"向下 $v$"与"向东 $v_0$"的合成（$- \vec v_0$ 向西的相反方向为东）。矢量三角形如图。

**补充解答（课件只给出矢量图）**：大小为

$$
v_{\text{雨车}}=\sqrt{v^{2}+v_0^{2}}
$$

方向偏向车行方向的后方（东），与竖直方向的夹角

$$
\theta=\arctan\frac{v_0}{v}
$$

车上人看到雨滴斜向后下方运动，车速越大，轨迹越倾斜。若取向西为水平正方向，雨相对车的水平速度分量为 $-v_0$。

### 例 1.10 飞机的航向

飞机速率 120 m/s，风速 50 m/s 自西向东，欲使飞机向正北航行，驾驶员应取何航向？相对地面的速度多大？

解：设飞机为 $A$、空气为 $F$、地面为 $E$。已知 $\vec v_{AF}$ 大小 120 m/s（航向待定），$\vec v_{FE}$ 大小 50 m/s 向东，要求 $\vec v_{AE}$ 指向正北。由

$$
\vec v_{AE}=\vec v_{AF}+\vec v_{FE}
$$

作矢量三角形：$\vec v_{AE}$ 竖直向上，$\vec v_{FE}$ 水平向右，$\vec v_{AF}$ 斜向左上。**补充解答（课件只给结果）**：

$$
\sin\theta=\frac{v_{FE}}{v_{AF}}=\frac{50}{120}=0.4167\ \Rightarrow\ \theta=24.6^\circ
$$

$$
v_{AE}=v_{AF}\cos\theta=120\cos24.6^\circ\approx109\ \text{m/s}
$$

即航向为**北偏西约 24.6°**，相对地面的速率为 **109 m/s**。机头方向（$\vec v_{AF}$）与航迹方向（$\vec v_{AE}$）不同，速度合成要按矢量关系计算。

## 本章要点

- 位矢、位移、速度都是矢量，路程、速率是标量；一般关系为 $\Delta s\ge|\Delta\vec r|\ge|\Delta r|$，等号需要相应几何条件。
- 瞬时速度大小等于瞬时速率；平均速度大小一般小于或等于平均速率，二者相等要求在该时间段内沿直线单向运动。
- 加速度 $\vec a=\mathrm d\vec v/\mathrm dt$ 反映速度**矢量**的变化；曲线运动中它必然偏向轨迹凹侧。
- 自然坐标下 $\vec a=a_\tau\vec\tau+a_n\vec n$，$a_\tau=\mathrm dv/\mathrm dt$ 管速率，$a_n=v^{2}/\rho$ 管方向；$\rho$ 是曲率半径，不是圆半径的通用写法。
- 运动学第二类问题必须积分并代入初始条件；$v^{2}-v_0^{2}=2as$ 只在 $a$ 为常量时成立。
- 求路程前先判断 $v$ 是否变号，转向点要分段计算。
- 相对运动中 $\vec v_{\text{绝对}}=\vec v_{\text{相对}}+\vec v_{\text{牵连}}$，加速度只在牵连运动为匀速直线运动时才相等。

## 原始资料

- 第1章1-4节 参考系 坐标系 时间 位置矢量 位移 速度 加速度（1）.pdf（25 页，主干：§1-2、§1-3、§1-4）
- 第1章1-4节 参考系 坐标系 时间 位置矢量 位移 速度 加速度.pdf（2 页，拉船靠岸例题，见例 1.5）
- 第1章6节 圆周运动 测量.pdf（13 页，§1-6 与时间、质量测量）
- 第1章7节 运动学两类基本问题 相对运动1.pdf（5 页，§1-7 相对运动）
