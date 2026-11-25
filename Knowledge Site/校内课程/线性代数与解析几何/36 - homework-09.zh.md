---
slug: "homework-09"
title: "第 9 次作业（正交对角化与特征值性质）"
summary: "实对称矩阵的正交对角化、幂等矩阵的谱、迹与行列式定谱、AB 与 BA 的特征值、同时对角化，收录 6 道原题与补充解答。"
updatedAt: "2026-11-25"
content_type: "reference"
group: "homework"
displayNumber: "09"
tags:
  - "线性代数"
  - "解析几何"
sources:
  - kind: article
    title: "9.jpg"
    url: "https://drive.google.com/file/d/1mgmPErBlI5xUvaO9F-YxX8Epu9GeYC1N/view?usp=drivesdk"
---

本次作业有 6 个答题卡题目，教材第 14 题含 (1)、(3) 两个小题，第 21 题含 (1)、(2) 两个小题。以下保留教材题号，并为各题提供补充解答。

## 14.(1) 三阶实对称矩阵的正交对角化
<!-- homework-topic: 三阶实对称矩阵的正交对角化 -->

**原题**：求正交矩阵 $T$，使 $T^{-1}AT$ 为对角矩阵：

$$
A=\begin{pmatrix}
6&2&4\\
2&3&2\\
4&2&6
\end{pmatrix}.
$$

**补充解答**

**第一步：用不变量写特征多项式。** $A$ 是实对称矩阵，先看它是否容易求谱。三阶矩阵的特征多项式为

$$
|\lambda E-A|=\lambda^3-(\operatorname{tr}A)\lambda^2+s_2\lambda-|A|,
$$

其中 $s_2$ 是全部二阶主子式之和。计算：

$$
\operatorname{tr}A=6+3+6=15,
$$

$$
s_2=\begin{vmatrix}6&2\\2&3\end{vmatrix}
+\begin{vmatrix}6&4\\4&6\end{vmatrix}
+\begin{vmatrix}3&2\\2&6\end{vmatrix}
=14+20+14=48,
$$

$$
\begin{aligned}
|A|&=6(18-4)-2(12-8)+4(4-12)\\
&=84-8-32=44.
\end{aligned}
$$

于是

$$
|\lambda E-A|=\lambda^3-15\lambda^2+48\lambda-44.
$$

试常数项 $44$ 的因子，$\lambda=2$：

$$
8-60+96-44=0,
$$

故 $\lambda-2$ 是一次因式。作多项式除法：

$$
\lambda^3-15\lambda^2+48\lambda-44=(\lambda-2)(\lambda^2-13\lambda+22)=(\lambda-2)(\lambda-2)(\lambda-11).
$$

所以特征值为

$$
\lambda_1=11,\qquad \lambda_2=\lambda_3=2.
$$

**第二步：求 $\lambda=11$ 的特征向量。** 解 $(11E-A)\boldsymbol x=\boldsymbol 0$：

$$
11E-A=\begin{pmatrix}
5&-2&-4\\
-2&8&-2\\
-4&-2&5
\end{pmatrix}
\longrightarrow
\begin{pmatrix}
1&0&-1\\[2pt]
0&2&-1\\[2pt]
0&0&0
\end{pmatrix}.
$$

（把第二行乘 $-\tfrac12$ 化为 $(1,-4,1)$；第一行减 $5$ 倍它得 $(0,18,-9)$，约去 $9$ 得 $(0,2,-1)$；第三行加 $4$ 倍它得 $(0,-18,9)$，与上一行成比例，化为零行；再把 $(0,2,-1)$ 的 $2$ 倍加到 $(1,-4,1)$ 上，得 $(1,0,-1)$。）

由 $x_1=x_3$、$2x_2=x_3$，取 $x_3=2$，得

$$
\alpha_1=(2,1,2)^{\mathrm T}.
$$

单位化：

$$
\eta_1=\frac{\alpha_1}{|\alpha_1|}=\frac13(2,1,2)^{\mathrm T},\qquad |\alpha_1|=3.
$$

**第三步：求 $\lambda=2$ 的特征向量。** 解 $(2E-A)\boldsymbol x=\boldsymbol 0$：

$$
2E-A=\begin{pmatrix}
-4&-2&-4\\
-2&-1&-2\\
-4&-2&-4
\end{pmatrix}
\longrightarrow
\begin{pmatrix}
2&1&2\\
0&0&0\\
0&0&0
\end{pmatrix},
$$

同解方程为

$$
2x_1+x_2+2x_3=0.
$$

取基础解系

$$
\xi_2=(1,0,-1)^{\mathrm T},\qquad \xi_3=(0,-2,1)^{\mathrm T},
$$

两者都满足 $2x_1+x_2+2x_3=0$（$2+0-2=0$，$0-2+2=0$）。

**第四步：在同一特征值内部正交化。** 不同特征值的特征向量自动正交，所以只需处理 $\lambda=2$ 的两个向量。取

$$
\beta_2=\xi_2=(1,0,-1)^{\mathrm T},
$$

$$
\beta_3=\xi_3-\frac{(\xi_3,\beta_2)}{(\beta_2,\beta_2)}\beta_2
=(0,-2,1)^{\mathrm T}-\frac{-1}{2}(1,0,-1)^{\mathrm T}
=\left(\frac12,-2,\frac12\right)^{\mathrm T}.
$$

为去掉分数，取 $\beta_3=(1,-4,1)^{\mathrm T}$（$\beta_3$ 是特征向量的非零倍数，仍是特征向量）。检验：

$$
(\beta_2,\beta_3)=1+0-1=0 .
$$

**第五步：单位化并写出 $T$。**

$$
\eta_2=\frac{\beta_2}{|\beta_2|}=\frac{1}{\sqrt2}(1,0,-1)^{\mathrm T},\qquad |\beta_2|=\sqrt2,
$$

$$
\eta_3=\frac{\beta_3}{|\beta_3|}=\frac{1}{3\sqrt2}(1,-4,1)^{\mathrm T},\qquad |\beta_3|=\sqrt{18}=3\sqrt2 .
$$

按特征值 $11,2,2$ 的次序排列：

$$
T=(\eta_1,\eta_2,\eta_3)=
\begin{pmatrix}
\dfrac23&\dfrac{1}{\sqrt2}&\dfrac{1}{3\sqrt2}\\[6pt]
\dfrac13&0&-\dfrac{4}{3\sqrt2}\\[6pt]
\dfrac23&-\dfrac{1}{\sqrt2}&\dfrac{1}{3\sqrt2}
\end{pmatrix},
$$

则

$$
T^{-1}AT=T^{\mathrm T}AT=\operatorname{diag}(11,2,2).
$$

**验算**：三列两两正交且长度均为 $1$，故 $T^{\mathrm T}T=E$；$A\alpha_1=11\alpha_1$、$A\beta_2=2\beta_2$、$A\beta_3=2\beta_3$ 可逐一代入。例如

$$
A(2,1,2)^{\mathrm T}=(12+2+8,\ 4+3+4,\ 8+2+12)^{\mathrm T}=(22,11,22)^{\mathrm T}=11(2,1,2)^{\mathrm T},
$$

$$
A(1,-4,1)^{\mathrm T}=(6-8+4,\ 2-12+2,\ 4-8+6)^{\mathrm T}=(2,-8,2)^{\mathrm T}=2(1,-4,1)^{\mathrm T}.
$$

再由 $\operatorname{tr}A=15=11+2+2$、$|A|=44=11\cdot2\cdot2$ 复核谱。

> **注意**：$T$ 不唯一。$\lambda=2$ 的特征子空间是二维平面 $2x_1+x_2+2x_3=0$，在其中任取一组标准正交基都可以，本题只是选了计算最省的一组。

---

## 14.(3) 四阶实对称矩阵的正交对角化
<!-- homework-topic: 四阶实对称矩阵的正交对角化 -->

**原题**：求正交矩阵 $T$，使 $T^{-1}AT$ 为对角矩阵：

$$
A=\begin{pmatrix}
4&-1&-1&1\\
-1&4&1&-1\\
-1&1&4&-1\\
1&-1&-1&4
\end{pmatrix}.
$$

**补充解答**

**第一步：利用秩一结构求谱。** 对角元减去 $3$ 后，$A-3E$ 的第一列是 $\alpha_4=(1,-1,-1,1)^{\mathrm T}$，其余各列都是第一列或它的相反向量。因此 $A=3E+\alpha_4\alpha_4^{\mathrm T}$，从而

$$
A x=3x+\alpha_4(\alpha_4^{\mathrm T}x).
$$

由 $\alpha_4^{\mathrm T}\alpha_4=4$，得 $A\alpha_4=7\alpha_4$。与 $\alpha_4$ 正交的三维子空间就是 $\lambda=3$ 的特征子空间。解方程 $x_1-x_2-x_3+x_4=0$，可取一组基

$$
\alpha_1=(1,1,0,0)^{\mathrm T},\quad
\alpha_2=(1,0,1,0)^{\mathrm T},\quad
\alpha_3=(-1,0,0,1)^{\mathrm T}.
$$

$\alpha_1,\alpha_2,\alpha_3$ 的第 $2,3,4$ 个坐标依次形成三个标准基向量，所以它们线性无关。再加上 $\alpha_4$，已得到四个线性无关的特征向量，故

$$
|\lambda E-A|=(\lambda-3)^3(\lambda-7).
$$

想复核系数，可算 $\operatorname{tr}A=16=3+3+3+7$、$|A|=189=3^3\cdot7$，与上式一致。

**第二步：在 $\lambda=3$ 的特征子空间内正交化。** 取

$$
\beta_1=\alpha_1=(1,1,0,0)^{\mathrm T},
$$

$$
\beta_2=\alpha_2-\frac{(\alpha_2,\beta_1)}{(\beta_1,\beta_1)}\beta_1
=(1,0,1,0)^{\mathrm T}-\frac12(1,1,0,0)^{\mathrm T}
=\left(\frac12,-\frac12,1,0\right)^{\mathrm T},
$$

为方便取 $\beta_2=(1,-1,2,0)^{\mathrm T}$。

$$
\begin{aligned}
\beta_3&=\alpha_3-\frac{(\alpha_3,\beta_1)}{(\beta_1,\beta_1)}\beta_1
-\frac{(\alpha_3,\beta_2)}{(\beta_2,\beta_2)}\beta_2\\
&=(-1,0,0,1)^{\mathrm T}+\frac12(1,1,0,0)^{\mathrm T}+\frac16(1,-1,2,0)^{\mathrm T}\\
&=\left(-\frac13,\frac13,\frac13,1\right)^{\mathrm T},
\end{aligned}
$$

其中 $(\alpha_3,\beta_1)=-1$，$(\alpha_3,\beta_2)=-1$，$(\beta_1,\beta_1)=2$，$(\beta_2,\beta_2)=6$。为去掉分数，取 $\beta_3=(-1,1,1,3)^{\mathrm T}$。

**第三步：单位化。**

$$
\eta_1=\frac{1}{\sqrt2}(1,1,0,0)^{\mathrm T},\quad
\eta_2=\frac{1}{\sqrt6}(1,-1,2,0)^{\mathrm T},
$$

$$
\eta_3=\frac{1}{2\sqrt3}(-1,1,1,3)^{\mathrm T},\quad
\eta_4=\frac12(1,-1,-1,1)^{\mathrm T}.
$$

其中 $|\beta_3|=\sqrt{1+1+1+9}=2\sqrt3$，$|\alpha_4|=2$。

**第四步：写出 $T$。**

$$
T=(\eta_1,\eta_2,\eta_3,\eta_4)=
\begin{pmatrix}
\dfrac{1}{\sqrt2}&\dfrac{1}{\sqrt6}&-\dfrac{1}{2\sqrt3}&\dfrac12\\[6pt]
\dfrac{1}{\sqrt2}&-\dfrac{1}{\sqrt6}&\dfrac{1}{2\sqrt3}&-\dfrac12\\[6pt]
0&\dfrac{2}{\sqrt6}&\dfrac{1}{2\sqrt3}&-\dfrac12\\[6pt]
0&0&\dfrac{3}{2\sqrt3}&\dfrac12
\end{pmatrix},
$$

则

$$
T^{-1}AT=T^{\mathrm T}AT=\operatorname{diag}(3,3,3,7).
$$

**验算**：$\eta_1,\eta_2,\eta_3$ 已正交（构造时逐次减去了前面各方向的投影），且

$$
(\eta_4,\eta_1)=\frac{1}{2\sqrt2}(1-1)=0,\quad
(\eta_4,\eta_2)=\frac{1}{2\sqrt6}(1+1-2)=0,\quad
(\eta_4,\eta_3)=\frac{1}{4\sqrt3}(-1-1-1+3)=0,
$$

故 $T^{\mathrm T}T=E$；再由 $A\eta_i=\lambda_i\eta_i$ 得 $T^{\mathrm T}AT=\operatorname{diag}(3,3,3,7)$。

> **理解关键**：写成 $3E+\alpha_4\alpha_4^{\mathrm T}$ 后，只需区分 $\alpha_4$ 的方向和它的正交补。秩一项在正交补上一律为零，因此这里直接得到三维特征子空间。

---

## 15. 幂等实对称矩阵可正交对角化为 $\operatorname{diag}(E_r,0)$
<!-- homework-topic: 幂等实对称矩阵的标准形 -->

**原题**：设 $A$ 为实对称矩阵，且 $A^2=A$。证明：存在正交矩阵 $T$，使

$$
T^{-1}AT=\begin{pmatrix}E_r&0\\0&0\end{pmatrix},
$$

其中 $r=r(A)$。

**补充解答**

**第一步：$A$ 的特征值只能是 $0$ 或 $1$。** 设 $A\boldsymbol x=\lambda\boldsymbol x$，$\boldsymbol x\ne\boldsymbol 0$。则

$$
\lambda^2\boldsymbol x=A^2\boldsymbol x=A\boldsymbol x=\lambda\boldsymbol x,
$$

即 $(\lambda^2-\lambda)\boldsymbol x=\boldsymbol 0$。因 $\boldsymbol x\ne\boldsymbol 0$，得 $\lambda^2-\lambda=0$，所以 $\lambda=0$ 或 $\lambda=1$。

这一步只用 $A^2=A$，与对称性无关。

**第二步：$A$ 可正交对角化。** 由 $A$ 实对称，据 5.3 节定理 3.6，存在正交矩阵 $Q$ 使

$$
Q^{\mathrm T}AQ=\operatorname{diag}(\lambda_1,\lambda_2,\dots,\lambda_n),
$$

其中 $\lambda_i$ 为 $A$ 的全部特征值（按重数计）。

**第三步：把对角元排成 $E_r$ 与 $0$。** 由第一步，每个 $\lambda_i$ 为 $0$ 或 $1$。设其中有 $r'$ 个为 $1$。把 $Q$ 的列重新排列（相当于右乘一个置换矩阵 $P$，$QP$ 仍为正交矩阵），可使 $1$ 排在前面：

$$
(QP)^{\mathrm T}A(QP)=\operatorname{diag}(\underbrace{1,\dots,1}_{r'},\underbrace{0,\dots,0}_{n-r'}).
$$

取 $T=QP$，则 $T$ 正交，且上式左端就是 $T^{-1}AT$。

**第四步：确定 $r'=r(A)$。** 正交变换是相似变换，保持秩；对角矩阵的秩等于非零对角元的个数，所以

$$
r(A)=r\bigl(T^{\mathrm T}AT\bigr)=r' .
$$

于是

$$
T^{-1}AT=\operatorname{diag}(E_{r},0).
$$

**补充说明**：$T$ 的前 $r$ 列是 $\lambda=1$ 的单位特征向量，它们张成 $A$ 的列空间（即 $A$ 的像）；后 $n-r$ 列是 $\lambda=0$ 的单位特征向量，张成 $\ker A$。因此 $\mathbb R^n$ 被正交地分解为“$A$ 作用的平面”与“被 $A$ 压平的方向”两部分，这正是“投影矩阵”的几何含义。

**验算（二阶投影矩阵）**：取

$$
A=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix},\qquad
T=\frac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}.
$$

直接验算 $A^2=A$（每行之和为 $1$，故 $A\boldsymbol e=\boldsymbol e$，$\boldsymbol e=(1,1)^{\mathrm T}$）；$A$ 对称，$r(A)=1$；$T$ 的两列都是单位向量且互相正交，故 $T$ 正交。计算

$$
T^{\mathrm T}AT=\begin{pmatrix}1&0\\0&0\end{pmatrix}=\operatorname{diag}(E_1,0),
$$

与结论相符。

> **易错点**：不能只验证“$A$ 的特征值只有 $0,1$”就断言结论。例如 $A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ 不满足 $A^2=A$（$A^2=\begin{pmatrix}1&2\\0&1\end{pmatrix}$），而 $A=\begin{pmatrix}1&0\\0&1\end{pmatrix}$ 与 $A=0$ 虽都是幂等的，却都不是“一般情形”。关键是实对称提供了**正交**矩阵 $T$，幂等提供了对角元只能是 $0,1$，两者缺一不可。

---

## 17. 幂等矩阵的特征值
<!-- homework-topic: 由矩阵方程确定特征值 -->

**原题**：设 $A^2=A$，证明：$A$ 的特征值只能是 $0$ 或 $1$。

**补充解答**

设 $\lambda$ 是 $A$ 的特征值，$\boldsymbol x$ 是对应的特征向量，$\boldsymbol x\ne\boldsymbol 0$。由 $A\boldsymbol x=\lambda\boldsymbol x$，

$$
A^2\boldsymbol x=A(A\boldsymbol x)=A(\lambda\boldsymbol x)=\lambda A\boldsymbol x=\lambda^2\boldsymbol x .
$$

另一方面，由 $A^2=A$ 得 $A^2\boldsymbol x=A\boldsymbol x=\lambda\boldsymbol x$。两式相减：

$$
(\lambda^2-\lambda)\boldsymbol x=\boldsymbol 0 .
$$

$\boldsymbol x\ne\boldsymbol 0$，故 $\lambda^2-\lambda=0$，即

$$
\lambda=0\quad\text{或}\quad \lambda=1 .
$$

**补充（更强的结论）**：$A^2=A$ 时 $A$ 一定可对角化，且

$$
\operatorname{tr}A=r(A).
$$

理由：任意向量 $x$ 可写成 $x=Ax+(x-Ax)$。因为 $A(Ax)=Ax$，$A(x-Ax)=0$，两部分分别落在 $\lambda=1$ 与 $\lambda=0$ 的解空间。两个空间的交只有零向量，合并各自的基便得到对角化所需的一组基。对角矩阵上 $1$ 的个数同时等于迹和秩。

**反例检验（条件不能省）**：若去掉 $A^2=A$，结论不再成立。例如 $A=\begin{pmatrix}2&0\\0&3\end{pmatrix}$ 的特征值为 $2,3$，都不在 $\{0,1\}$ 中。

> **易错点**：证明中必须用“$\boldsymbol x\ne\boldsymbol 0$”才能从 $(\lambda^2-\lambda)\boldsymbol x=\boldsymbol 0$ 推出 $\lambda^2-\lambda=0$。若允许 $\boldsymbol x=\boldsymbol 0$，任何 $\lambda$ 都满足等式，推理就失效了。

---

## 19. 由迹与行列式定二阶矩阵的特征值
<!-- homework-topic: 二阶矩阵的迹与行列式定谱 -->

**原题**：设 $A$ 是二阶方阵，$\operatorname{tr}A=8$，$|A|=12$，求 $A$ 的特征值。

**补充解答**

二阶矩阵的特征多项式有统一形式：

$$
|\lambda E-A|=\lambda^2-(\operatorname{tr}A)\lambda+|A|.
$$

（因为二阶时 $s_2$ 就是 $|A|$ 本身，$\lambda$ 的系数为 $-\operatorname{tr}A$。）代入已知：

$$
|\lambda E-A|=\lambda^2-8\lambda+12=(\lambda-2)(\lambda-6).
$$

所以 $A$ 的特征值为

$$
\lambda_1=2,\qquad \lambda_2=6 .
$$

**说明与检验**：$2+6=8=\operatorname{tr}A$，$2\cdot6=12=|A|$，与性质 1.2 一致。判别式 $64-48=16>0$，两个特征值互异且为实数，所以 $A$ 一定可对角化（二阶矩阵有两个互异实特征值）。注意题目没有给出 $A$ 的元素，谱却由迹与行列式完全确定——这是二阶矩阵特有的性质；三阶及以上，迹与行列式不足以定谱，还需要二阶主子式之和（见第 8 次作业第 1 题的做法）。

> **易错点**：不要把 $|A|$ 误当成“特征值之和”。二阶时 $|A|=\lambda_1\lambda_2$，$\operatorname{tr}A=\lambda_1+\lambda_2$；写成 $\lambda^2-8\lambda-12$ 会得到错误的两根。

---

## 21.(1) $AB$ 与 $BA$ 的非零特征值相同
<!-- homework-topic: AB 与 BA 的非零特征值 -->

**原题**：设 $A,B$ 为 $n$ 阶方阵。证明若 $\lambda$ 为 $AB$ 的一个非零特征值，则它也是 $BA$ 的一个特征值。

**补充解答**

设 $\lambda\ne0$ 是 $AB$ 的特征值，$\boldsymbol x\ne\boldsymbol 0$ 是对应的特征向量：

$$
AB\boldsymbol x=\lambda\boldsymbol x .
$$

**第一步：证明 $B\boldsymbol x\ne\boldsymbol 0$。** 反设 $B\boldsymbol x=\boldsymbol 0$，则

$$
AB\boldsymbol x=A(B\boldsymbol x)=\boldsymbol 0,
$$

而 $AB\boldsymbol x=\lambda\boldsymbol x\ne\boldsymbol 0$（因 $\lambda\ne0$、$\boldsymbol x\ne\boldsymbol 0$），矛盾。故 $B\boldsymbol x\ne\boldsymbol 0$，它才是 $BA$ 的候选特征向量。

**第二步：验证 $B\boldsymbol x$ 是 $BA$ 的特征向量。**

$$
BA(B\boldsymbol x)=B(AB\boldsymbol x)=B(\lambda\boldsymbol x)=\lambda(B\boldsymbol x).
$$

由第一步，$B\boldsymbol x\ne\boldsymbol 0$，所以 $\lambda$ 是 $BA$ 的特征值，$B\boldsymbol x$ 是对应的特征向量。

**补充：反向同理。** 交换 $A,B$ 的角色。若 $\mu\ne0$ 是 $BA$ 的特征值，取非零特征向量 $\boldsymbol y$，则 $A\boldsymbol y\ne\boldsymbol 0$ 且

$$
AB(A\boldsymbol y)=A(BA\boldsymbol y)=\mu(A\boldsymbol y),
$$

所以 $\mu$ 也是 $AB$ 的特征值。两边合起来即得“非零特征值相同”。

**补充（更强的结论）**：$A,B$ 为同阶方阵时，$AB$ 与 $BA$ 的特征多项式相同，因而连同 $0$ 在内的全部特征值都相同。证明可用分块行列式：对 $\lambda\ne0$，

$$
\det\begin{pmatrix}\lambda E&A\\B&E\end{pmatrix}
=\det(\lambda E)\cdot\det\bigl(E-B(\lambda E)^{-1}A\bigr)
=\det(\lambda E-BA),
$$

按另一条分块消元路径又得

$$
\det\begin{pmatrix}\lambda E&A\\B&E\end{pmatrix}
=\det(E)\cdot\det(\lambda E-AB)=\det(\lambda E-AB).
$$

于是 $\lambda\ne0$ 时 $\det(\lambda E-AB)=\det(\lambda E-BA)$；两边都是 $\lambda$ 的多项式，在无穷多个 $\lambda$ 上相等，故作为多项式恒等，$AB$ 与 $BA$ 的特征多项式相同。

**验算**：取

$$
A=\begin{pmatrix}1&2\\0&3\end{pmatrix},\qquad
B=\begin{pmatrix}0&1\\1&0\end{pmatrix},
$$

则

$$
AB=\begin{pmatrix}2&1\\3&0\end{pmatrix},\qquad
BA=\begin{pmatrix}0&3\\1&2\end{pmatrix}.
$$

$\operatorname{tr}(AB)=2=\operatorname{tr}(BA)$，$\det(AB)=-3=\det(BA)$，特征多项式同为 $\lambda^2-2\lambda-3=(\lambda-3)(\lambda+1)$，谱为 $3,-1$，与结论一致。

> **易错点**：第一步不能省。若不作“$B\boldsymbol x\ne\boldsymbol 0$”的论证，就无法确认 $B\boldsymbol x$ 是特征向量；而当 $\lambda=0$ 时这一步确实会失效，这正是本题要求“非零特征值”的原因（零特征值的情形由下一小题单独处理，但结论在 $n$ 阶方阵时也成立）。

---

## 21.(2) $0$ 是 $AB$ 的特征值时 $0$ 也是 $BA$ 的特征值
<!-- homework-topic: 零特征值的传递 -->

**原题**：设 $A,B$ 都是 $n$ 阶矩阵，若 $\lambda=0$ 是 $AB$ 的特征值，证明 $\lambda=0$ 也是 $BA$ 的特征值。

**补充解答**

$\lambda=0$ 是 $AB$ 的特征值，等价于

$$
|0\cdot E-AB|=|-AB|=0,
$$

即 $\det(AB)=0$。由行列式的乘法性质，

$$
\det(BA)=\det(B)\det(A)=\det(A)\det(B)=\det(AB)=0 .
$$

于是 $|0\cdot E-BA|=0$，即 $0$ 是 $BA$ 的特征值。

**另证（用上一小题的分块恒等式）**：由 21.(1) 的补充，$AB$ 与 $BA$ 的特征多项式相同；$AB$ 有根 $0$，故 $BA$ 的特征多项式也有根 $0$。

**说明**：这一小题不能照搬 21.(1) 的“$B\boldsymbol x$ 法”，因为当 $\lambda=0$ 时 $AB\boldsymbol x=\boldsymbol 0$ 完全可以由 $B\boldsymbol x=\boldsymbol 0$ 造成，此时 $B\boldsymbol x$ 不是非零向量，无法作为特征向量。改用“行列式为 $0$”就绕开了这个障碍，这也是两小题解法不同的原因。

**验算**：取 $A=\begin{pmatrix}1&0\\0&0\end{pmatrix}$，$B=\begin{pmatrix}0&1\\0&0\end{pmatrix}$。则

$$
AB=\begin{pmatrix}0&1\\0&0\end{pmatrix},\qquad BA=\begin{pmatrix}0&0\\0&0\end{pmatrix},
$$

$\det(AB)=0$，$\det(BA)=0$，两者都以 $0$ 为特征值（$BA$ 的特征值为 $0,0$）。

> **易错点**：$A,B$ 必须是**同阶方阵**，否则 $\det(AB)$ 与 $\det(BA)$ 尺寸不同，$\det(AB)=\det(A)\det(B)$ 也无法使用。另外“$\det=0$”只说明 $0$ 是特征值，不能由此推出其他特征值也相同。

---

## 23. 同一个 $P$ 对角化两个矩阵则 $AB=BA$
<!-- homework-topic: 同时对角化与乘法交换 -->

**原题**：设 $A,B$ 都是 $n$ 阶矩阵，且存在可逆矩阵 $P$，使得 $P^{-1}AP$ 与 $P^{-1}BP$ 都是对角矩阵，证明 $AB=BA$。

**补充解答**

**第一步：写出对角形。** 设

$$
P^{-1}AP=\Lambda_1=\operatorname{diag}(\lambda_1,\dots,\lambda_n),\qquad
P^{-1}BP=\Lambda_2=\operatorname{diag}(\mu_1,\dots,\mu_n).
$$

**第二步：计算 $P^{-1}(AB)P$。** 由 $A=P\Lambda_1P^{-1}$、$B=P\Lambda_2P^{-1}$，

$$
\begin{aligned}
P^{-1}(AB)P
&=P^{-1}(P\Lambda_1P^{-1})(P\Lambda_2P^{-1})P\\
&=P^{-1}P\,\Lambda_1\,P^{-1}P\,\Lambda_2\,P^{-1}P\\
&=\Lambda_1\Lambda_2 .
\end{aligned}
$$

同理

$$
P^{-1}(BA)P=\Lambda_2\Lambda_1 .
$$

**第三步：对角矩阵可交换。**

$$
\Lambda_1\Lambda_2=\operatorname{diag}(\lambda_1\mu_1,\dots,\lambda_n\mu_n)
=\operatorname{diag}(\mu_1\lambda_1,\dots,\mu_n\lambda_n)=\Lambda_2\Lambda_1 .
$$

于是

$$
P^{-1}(AB)P=P^{-1}(BA)P .
$$

两边左乘 $P$、右乘 $P^{-1}$，得 $AB=BA$。

**为什么条件里必须是“同一个 $P$”**：若 $A$ 与 $B$ 各自可对角化，但用的相似变换矩阵不同，结论就不成立。反例：

$$
A=\begin{pmatrix}1&0\\0&2\end{pmatrix},\qquad
B=\begin{pmatrix}2&0\\1&1\end{pmatrix}.
$$

$B$ 的特征值为 $2,1$，互异，可对角化（$A$ 本身已是对角矩阵）；但

$$
AB=\begin{pmatrix}2&0\\2&2\end{pmatrix},\qquad
BA=\begin{pmatrix}2&0\\1&2\end{pmatrix},
$$

并不相等。可见“同时对角化”比“各自可对角化”强得多。

> **理解关键**：同一个 $P$ 给出了由共同特征向量组成的基。换到这组基下，矩阵乘法变为对角元逐项相乘。反过来，若想由 $AB=BA$ 推出可同时对角化，还需两个矩阵在所选数域上各自可对角化。

---

## 本次小结

本次作业的六道题分别落在三条线上。第一条是正交对角化（14(1)、14(3)、15）：实对称矩阵必可正交对角化，步骤是先求谱、再求特征向量、在同一重特征值内部施密特正交化并单位化、把单位特征向量按列排成 $T$，且 $T$ 的列次序必须与对角元次序一致。第二条是由矩阵方程定谱（17、19、21）：$A^2=A$ 迫使 $\lambda\in\{0,1\}$，二阶矩阵由迹与行列式完全定谱，$AB$ 与 $BA$ 的非零特征值相同（零特征值另用行列式处理）。第三条是同时对角化（23）：同一个 $P$ 把两个矩阵都化成对角形，则 $AB=BA$。易错点集中在三处：正交化只能在同一特征值内部进行；$T$ 不唯一，但列必须与对角元对应；$AB$ 与 $BA$ 的论证中“$B\boldsymbol x\ne\boldsymbol 0$”不能省，$\lambda=0$ 时要换用 $\det(AB)=0$ 的通道。
