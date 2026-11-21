---
slug: "homework-09"
title: "第 9 次作业（光的衍射）"
summary: "光的衍射的原题与解析。"
updatedAt: "2026-11-19"
content_type: "reference"
group: "homework"
displayNumber: "09"
tags: ["基础物理"]
sources: [{"kind": "article", "title": "9 光的衍射习题.pdf", "url": "https://drive.google.com/file/d/19BjVoz4TohoMjXjdXY72Zds9KT4StJvG/view?usp=drivesdk"}]
---

## 一、选择题

### 题目 1 · 选择题 1

<!-- homework-topic: 判断单缝衍射屏上某点是亮纹还是暗纹及半波带数 -->

在单缝衍射实验中，缝宽 $a=0.2\ \text{mm}$，透镜焦距 $f=0.4\ \text{m}$，入射光波长 $\lambda=500\ \text{nm}$，则在距离中央亮纹中心位置 $2\ \text{mm}$ 处是亮纹还是暗纹？从这个位置看上去可以把波阵面分为几个半波带？［ ］

（A）亮纹，3 个半波带；（B）亮纹，4 个半波带；

（C）暗纹，3 个半波带；（D）暗纹，4 个半波带。

答案：D

【补充解答】屏上位置与衍射角满足 $\sin\theta\approx\dfrac{x}{f}=\dfrac{2\times10^{-3}}{0.4}=5\times10^{-3}$。半波带数

$$
N=\frac{a\sin\theta}{\lambda/2}=\frac{2\times0.2\times10^{-3}\times5\times10^{-3}}{500\times10^{-9}}=4
$$

半波带数为偶数，两两相消，为暗纹；$N=2k$ 对应第 $k$ 级极小，此处 $k=2$，正是第二级暗纹。选 D。

### 题目 2 · 选择题 2

<!-- homework-topic: 单缝两侧第八级极小之间的距离 -->

波长为 $632.8\ \text{nm}$ 的单色光通过一狭缝发生衍射。已知缝宽为 $1.2\ \text{mm}$，缝与观察屏之间的距离为 $D=2.3\ \text{m}$。则屏上两侧的两个第八级极小之间的距离 $\Delta x$ 为［ ］

（A）$1.70\ \text{cm}$；（B）$1.94\ \text{cm}$；（C）$2.18\ \text{cm}$；（D）$0.97\ \text{cm}$。

答案：B

【补充解答】第 $k$ 级极小满足 $a\sin\theta=k\lambda$，小角下 $\sin\theta\approx\tan\theta=\dfrac{x}{D}$：

$$
x_k=k\frac{\lambda D}{a}=8\times\frac{632.8\times10^{-9}\times2.3}{1.2\times10^{-3}}=9.70\times10^{-3}\ \text{m}
$$

两侧第八级极小关于中央对称，间距为 $2x_8$：

$$
\Delta x=2\times9.70\times10^{-3}=1.94\times10^{-2}\ \text{m}=1.94\ \text{cm}
$$

选 B。

### 题目 3 · 选择题 3

<!-- homework-topic: 光栅刻痕与缝宽相等时呈现的全部级数 -->

波长为 $600\ \text{nm}$ 的单色光垂直入射到光栅常数为 $2.5\times10^{-3}\ \text{mm}$ 的光栅上，光栅的刻痕与缝宽相等，则光谱上呈现的全部级数为［ ］

（A）$0$、$\pm1$、$\pm2$、$\pm3$、$\pm4$；（B）$0$、$\pm1$、$\pm3$；

（C）$\pm1$、$\pm3$；（D）$0$、$\pm2$、$\pm4$。

答案：B

【补充解答】$d=2.5\times10^{-3}\ \text{mm}=2.5\times10^{-6}\ \text{m}$。主极大条件 $d\sin\theta=k\lambda$，级次上限

$$
k_{\max}=\frac{d}{\lambda}=\frac{2.5\times10^{-6}}{600\times10^{-9}}=4.17
$$

故几何上可能有 $0,\pm1,\pm2,\pm3,\pm4$。刻痕与缝宽相等，即 $a=\dfrac{d}{2}$，缺级条件 $k=\dfrac{d}{a}m=2m$，$k=\pm2,\pm4$ 缺级。剩下 $0,\pm1,\pm3$，选 B。

### 题目 4 · 选择题 4

<!-- homework-topic: 白光一级光谱的张角 -->

用白光（波长范围：$400\ \text{nm}$–$760\ \text{nm}$）垂直照射光栅常数为 $2.4\times10^{-4}\ \text{cm}$ 的光栅，则第一级光谱的张角为［ ］

（A）$9.5^\circ$；（B）$18.3^\circ$；（C）$8.8^\circ$；（D）$13.9^\circ$。

答案：C

【补充解答】$d=2.4\times10^{-4}\ \text{cm}=2.4\times10^{-6}\ \text{m}$。第一级主极大 $\sin\theta=\dfrac{\lambda}{d}$：

$$
\sin\theta_{400}=\frac{400\times10^{-9}}{2.4\times10^{-6}}=0.1667\ \Longrightarrow\ \theta_{400}=9.59^\circ
$$

$$
\sin\theta_{760}=\frac{760\times10^{-9}}{2.4\times10^{-6}}=0.3167\ \Longrightarrow\ \theta_{760}=18.47^\circ
$$

张角

$$
\Delta\theta=18.47^\circ-9.59^\circ=8.88^\circ\approx8.8^\circ
$$

选 C。注意 18.3° 是紫端衍射角以外的误读，张角必须取两端之差。

### 题目 5 · 选择题 5

<!-- homework-topic: 使 X 射线能被晶体衍射所需的最小晶面间距 -->

欲使波长为 $\lambda$（设为已知）的 X 射线被晶体衍射，则该晶体的晶面间距最小应为［ ］。

（A）$\lambda/4$；（B）$2\lambda$；（C）$\lambda$；（D）$\lambda/2$。

答案：D

【补充解答】布拉格公式 $2d\sin\theta=k\lambda$，$\theta$ 为掠射角，$\sin\theta\le1$。对第一级（$k=1$）能发生衍射要求

$$
2d\ge\lambda\ \Longrightarrow\ d_{\min}=\frac{\lambda}{2}
$$

选 D。

## 二、填空题

### 题目 6 · 填空题 1

<!-- homework-topic: 两种波长下单缝中央明纹宽度的换算 -->

在单缝夫琅和费衍射实验中，设第一级暗纹的衍射角很小。若以钠黄光（$\lambda_1=589\ \text{nm}$）为入射光，中央明纹宽度为 $4.0\ \text{mm}$；若以蓝紫光（$\lambda_2=442\ \text{nm}$）为入射光，则中央明纹宽度为 ______ mm。

答案：$3.0\ \text{mm}$

【补充解答】中央明纹宽度为两侧第一级暗纹之间的距离，$l_0=\dfrac{2\lambda f}{a}$（$f$ 为透镜焦距），与波长成正比：

$$
l_0'=l_0\frac{\lambda_2}{\lambda_1}=4.0\times\frac{442}{589}=3.0\ \text{mm}
$$

### 题目 7 · 填空题 2

<!-- homework-topic: 光栅谱线多次重叠时求另一波长 -->

单色光 $\lambda_1=720\ \text{nm}$ 和另一单色光 $\lambda_2$ 经同一光栅衍射时，发生这两种谱线的多次重叠现象。设 $\lambda_1$ 的第 $k_1$ 级主极大与 $\lambda_2$ 的第 $k_2$ 级主极大重叠。现已知当 $k_1$ 分别为 2, 4, 6, … 时，对应的 $k_2$ 分别为 3, 6, 9, …，则波长 $\lambda_2=$ ______ nm。

答案：$480\ \text{nm}$

【补充解答】同一衍射角处两波长的主极大重合，即

$$
k_1\lambda_1=k_2\lambda_2\ \Longrightarrow\ \lambda_2=\frac{k_1}{k_2}\lambda_1=\frac{2}{3}\times720=480\ \text{nm}
$$

用 $k_1=4$、$k_2=6$ 校核：$\dfrac{4}{6}\times720=480\ \text{nm}$，一致。

### 题目 8 · 填空题 3

<!-- homework-topic: 由第一级衍射角求光栅常数与第二级衍射角 -->

为测定一个光栅的光栅常数，用波长为 $632.8\ \text{nm}$ 的单色光垂直照射光栅，测得第一级主极大的衍射角为 $18^\circ$，则光栅常数 $d=$ ______；第二级主极大的衍射角 ______。

答案：$2.05\times10^{-6}\ \text{m}$；$38.2^\circ$

【补充解答】由 $d\sin\theta_1=\lambda$：

$$
d=\frac{\lambda}{\sin18^\circ}=\frac{632.8\times10^{-9}}{0.3090}=2.05\times10^{-6}\ \text{m}
$$

第二级：

$$
\sin\theta_2=\frac{2\lambda}{d}=2\sin18^\circ=0.6180\ \Longrightarrow\ \theta_2=38.2^\circ
$$

### 题目 9 · 填空题 4

<!-- homework-topic: 宇航员恰好分辨地面两光源时两点间距 -->

一宇航员声称，他恰好能分辨他下方距他为 $H=160\ \text{km}$ 的地面上两个发射波长 $550\ \text{nm}$ 的点光源。假定宇航员的瞳孔直径 $D=5.0\ \text{mm}$，则此两点光源的间距为 $\Delta x=$ ______ m。

答案：$21\ \text{m}$

【补充解答】圆孔的最小分辨角由瑞利判据给出：

$$
\theta_{\min}=1.22\frac{\lambda}{D}=1.22\times\frac{550\times10^{-9}}{5.0\times10^{-3}}=1.34\times10^{-4}\ \text{rad}
$$

“恰好分辨”即两点对瞳孔张角等于 $\theta_{\min}$：

$$
\Delta x=H\theta_{\min}=1.6\times10^{5}\times1.34\times10^{-4}=21.5\ \text{m}\approx21\ \text{m}
$$

若用 $\theta=\lambda/D$ 的粗略式会得到 $17.6\ \text{m}$，两者差别来自圆孔的 1.22 因子，本题按圆孔处理。

### 题目 10 · 填空题 5

<!-- homework-topic: 由两组布拉格反射求 X 射线波长与晶面间距 -->

在比较两条单色 X 射线谱线波长时，注意到谱线 A 在与某种晶体的光滑表面成 $30^\circ$ 的掠射角时出现第 1 级反射极大。谱线 B（已知具有波长 $0.097\ \text{nm}$）则在与同一晶体的同一表面成 $60^\circ$ 的掠射角时出现第 3 级反射极大，则谱线 A 的波长为 $\lambda_A=$ ______ nm；晶面间距为 $d=$ ______ nm。

答案：$\lambda_A=0.168\ \text{nm}$；$d=0.168\ \text{nm}$

【补充解答】布拉格公式 $2d\sin\theta=k\lambda$，两式联立：

$$
2d\sin30^\circ=1\cdot\lambda_A,\qquad 2d\sin60^\circ=3\times0.097
$$

由第二式

$$
d=\frac{3\times0.097}{2\sin60^\circ}=\frac{0.291}{1.732}=0.168\ \text{nm}
$$

代回第一式

$$
\lambda_A=2d\sin30^\circ=d=0.168\ \text{nm}
$$

两者数值相同只是本题数据凑巧：$\sin60^\circ/\sin30^\circ=3\times\dfrac{0.097}{\lambda_A}$，即 $\sqrt3=\dfrac{0.291}{\lambda_A}$。

## 三、计算题

### 题目 11 · 计算题 1

<!-- homework-topic: 中央明纹宽度内可见的级数与光栅不透光部分宽度 -->

波长为 $600\ \text{nm}$ 的单色光垂直照射到一单缝宽度为 $0.05\ \text{mm}$ 的光栅上，在距光栅 $2\ \text{m}$ 的屏幕上，测得相邻两条纹间距 $\Delta x=0.4\ \text{cm}$。求：（1）在单缝衍射的中央明纹宽度内，最多可以看到几级，共几条光栅衍射明纹？（2）光栅不透光部分宽度 $b$ 为多少？

答案：（1）5 级，共 11 条；（2）$b=0.25\ \text{mm}$

【补充解答】由光栅主极大间距公式 $\Delta x=\dfrac{\lambda D}{d}$：

$$
d=\frac{\lambda D}{\Delta x}=\frac{600\times10^{-9}\times2}{4\times10^{-3}}=3.0\times10^{-4}\ \text{m}=0.30\ \text{mm}
$$

（1）单缝衍射中央明纹的半宽等于第一级衍射极小的位置 $x=\dfrac{\lambda D}{a}$：

$$
x_0=\frac{600\times10^{-9}\times2}{0.05\times10^{-3}}=2.4\times10^{-2}\ \text{m}=2.4\ \text{cm}
$$

中央明纹内可见的主极大级次满足 $|k|\Delta x<x_0$，即 $|k|<\dfrac{2.4}{0.4}=6$，故 $k=0,\pm1,\dots,\pm5$。因 $\dfrac{d}{a}=\dfrac{0.30}{0.05}=6$，第 6 级缺级，恰在中央明纹边缘之外，不影响计数。故最多 5 级，共 $2\times5+1=11$ 条。

（2）

$$
b=d-a=0.30-0.05=0.25\ \text{mm}
$$

### 题目 12 · 计算题 2

<!-- homework-topic: 单缝衍射中第 3 级与第 2 级明纹重合求波长 -->

在复色光照射下的单缝衍射图样中，某一波长单色光的第 3 级明纹位置恰与波长 $\lambda=600\ \text{nm}$ 的单色光的第 2 级明纹位置重合，求这光波的波长。

答案：按课堂常用的半波带近似，约 $429\ \text{nm}$。用单缝衍射的精确极大条件，约 $425\ \text{nm}$。

【补充解答】中央明纹两侧的第 $k$ 级明纹位于第 $k$、$k+1$ 级暗纹之间。半波带近似取 $a\sin\theta\approx(k+\tfrac12)\lambda$，也就是约 $2k+1$ 个半波带。同一侧明纹重合时，$a\sin\theta$ 相同，所以

$$
\left(3+\frac{1}{2}\right)\lambda'=\left(2+\frac{1}{2}\right)\times600\ \text{nm}
$$

$$
\lambda'=\frac{2.5}{3.5}\times600=428.6\ \text{nm}\approx429\ \text{nm}
$$

精确计算令 $\beta=\pi a\sin\theta/\lambda$，光强为 $I=I_0(\sin\beta/\beta)^2$。对 $\beta$ 求导，非零的次级极大满足 $\tan\beta=\beta$。在 $(2\pi,3\pi)$、$(3\pi,4\pi)$ 内分别求根，得 $\beta_2\approx7.7253$、$\beta_3\approx10.9041$。两条明纹重合时

$$
\lambda'=\frac{\beta_2}{\beta_3}\times600\ \text{nm}\approx425.1\ \text{nm}
$$

整数条件 $a\sin\theta=k\lambda$ 对应单缝暗纹。把它代入重合关系得到的 $400\ \text{nm}$ 是两条暗纹重合时的波长。

### 题目 13 · 计算题 3

<!-- homework-topic: 由第四级缺级求每厘米狭缝数与屏上全部谱线 -->

波长为 $680\ \text{nm}$ 的单色可见光垂直入射到缝宽为 $a=1.25\times10^{-4}\ \text{cm}$ 的透射光栅上，观察到第四级谱线缺级，透镜焦距 $f=1\ \text{m}$。求：

（1）此光栅每厘米有多少条狭缝；

（2）在屏上呈现的光谱线的全部级次和条纹数。

答案：（1）$2000$ 条/cm；（2）级次 $0,\pm1,\pm2,\pm3,\pm5,\pm6,\pm7$，共 13 条

【补充解答】$a=1.25\times10^{-4}\ \text{cm}=1.25\times10^{-6}\ \text{m}$。

（1）缺级条件 $k=\dfrac{d}{a}m$。第四级缺级且要求该级确实落在 $|\sin\theta|<1$ 的范围内，取 $m=1$：

$$
\frac{d}{a}=4\ \Longrightarrow\ d=4a=5.0\times10^{-6}\ \text{m}
$$

（若取 $m=2$ 得 $d=2a=2.5\times10^{-6}\ \text{m}$，此时第 4 级的 $\sin\theta=1.09>1$ 根本不存在，谈不上“缺级”，故舍去。）

每厘米狭缝数

$$
N=\frac{1\times10^{-2}}{5.0\times10^{-6}}=2000\ \text{条/cm}
$$

（2）级次上限

$$
k_{\max}=\frac{d}{\lambda}=\frac{5.0\times10^{-6}}{680\times10^{-9}}=7.35\ \Longrightarrow\ k=0,\pm1,\dots,\pm7
$$

第 $\pm4$ 级缺级，其余全部呈现：

$$
0,\ \pm1,\ \pm2,\ \pm3,\ \pm5,\ \pm6,\ \pm7
$$

共 $2\times6+1=13$ 条谱线。

### 题目 14 · 计算题 4

<!-- homework-topic: 第二级光谱的线宽度及第二、三级光谱的重叠宽度 -->

波长为 $400\ \text{nm}$–$760\ \text{nm}$ 范围的一束复色可见光垂直入射到光栅常数 $d=4.8\times10^{-4}\ \text{cm}$ 的透射光栅上，在屏上形成若干级彩色光谱。已知透镜焦距 $f=1.2\ \text{m}$。求：

（1）第二级光谱在屏上的线宽度；

（2）第二级与第三级光谱在屏上重叠的线宽度。

答案：（1）$0.20\ \text{m}$；（2）$9.1\ \text{cm}$

【补充解答】$d=4.8\times10^{-6}\ \text{m}$。谱线位置 $x=f\tan\theta$，$\sin\theta=\dfrac{k\lambda}{d}$。

（1）第二级（$k=2$）：

$$
\sin\theta_{400}=\frac{800\times10^{-9}}{4.8\times10^{-6}}=0.1667,\ \theta=9.59^\circ,\ x=1.2\tan9.59^\circ=0.203\ \text{m}
$$

$$
\sin\theta_{760}=\frac{1520\times10^{-9}}{4.8\times10^{-6}}=0.3167,\ \theta=18.46^\circ,\ x=1.2\tan18.46^\circ=0.401\ \text{m}
$$

$$
\Delta x_2=0.401-0.203=0.198\ \text{m}\approx0.20\ \text{m}
$$

（2）第三级（$k=3$）的紫端与红端：

$$
\sin\theta_{400}'=\frac{1200\times10^{-9}}{4.8\times10^{-6}}=0.25,\ \theta=14.48^\circ,\ x=1.2\tan14.48^\circ=0.310\ \text{m}
$$

$$
\sin\theta_{760}'=\frac{2280\times10^{-9}}{4.8\times10^{-6}}=0.475,\ \theta=28.36^\circ,\ x=1.2\tan28.36^\circ=0.648\ \text{m}
$$

第二级占据 $[0.203,\ 0.401]\ \text{m}$，第三级占据 $[0.310,\ 0.648]\ \text{m}$，重叠区为

$$
[0.310,\ 0.401]\ \text{m},\qquad \Delta x=0.401-0.310=0.091\ \text{m}\approx9.1\ \text{cm}
$$

重叠区从第三级光谱的紫端延伸到第二级光谱的红端。

### 题目 15 · 计算题 5

<!-- homework-topic: 分辨双星所需望远镜物镜的最小口径 -->

已知天空中两颗星相对于一望远镜的角距离为 $4.84\times10^{-6}\ \text{rad}$，它们发出的光波波长为 $550\ \text{nm}$。问望远镜物镜的口径至少要多大，才能分辨出这两颗星？

答案：$0.14\ \text{m}$

【补充解答】望远镜物镜为圆孔，最小分辨角

$$
\theta_{\min}=1.22\frac{\lambda}{D}\le\theta
$$

“至少”即取等号：

$$
\begin{aligned}
D&=\frac{1.22\lambda}{\theta}
=\frac{1.22\times550\times10^{-9}}{4.84\times10^{-6}}\\
&=\frac{6.71\times10^{-7}}{4.84\times10^{-6}}
=0.139\ \text{m}
\end{aligned}
$$

即口径至少约 $14\ \text{cm}$。

---
