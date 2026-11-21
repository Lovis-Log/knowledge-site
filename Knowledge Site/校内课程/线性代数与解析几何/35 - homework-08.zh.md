---
slug: "homework-08"
title: "第 8 次作业（习题五）"
summary: "矩阵的特征值、特征向量与相似对角化，收录 6 道原题与补充解答。"
updatedAt: "2026-11-21"
content_type: "reference"
group: "homework"
displayNumber: "08"
tags:
  - "线性代数"
  - "解析几何"
sources:
  - kind: article
    title: "8.jpg"
    url: "https://drive.google.com/file/d/1XTYvAOPfqQmaLR5381LakniRBrSJm_nE/view?usp=drivesdk"
---

本次作业有 6 个答题卡题目，教材第 1 题含两个小题。以下保留教材题号，并为各题提供补充解答。

## 1.(2) 三阶矩阵的特征值与特征向量
<!-- homework-topic: 三阶矩阵的特征值与特征向量 -->

**原题**：求下列矩阵的特征值和特征向量：

$$
A=\begin{pmatrix}
3&2&-1\\
-2&-2&2\\
3&6&-1
\end{pmatrix}.
$$

（截图第 1 题的题面只给了 (2)、(4) 两个小题，未见 (1)、(3)。）

**补充解答**

**第一步：特征多项式。** 用三组不变量算最省事。

$$
\operatorname{tr}A=3+(-2)+(-1)=0,
$$

$$
s_2=\begin{vmatrix}-2&2\\6&-1\end{vmatrix}+\begin{vmatrix}3&-1\\3&-1\end{vmatrix}+\begin{vmatrix}3&2\\-2&-2\end{vmatrix}
=(-10)+0+(-2)=-12,
$$

$$
|A|=3\bigl[(-2)(-1)-2\cdot6\bigr]-2\bigl[(-2)(-1)-2\cdot3\bigr]+(-1)\bigl[(-2)\cdot6-(-2)\cdot3\bigr]
=3(2-12)-2(2-6)+(-1)(-12+6)=-16 .
$$

于是

$$
|\lambda E-A|=\lambda^3-(\operatorname{tr}A)\lambda^2+s_2\lambda-|A|
=\lambda^3-12\lambda+16=(\lambda-2)^2(\lambda+4).
$$

故特征值为 $\lambda_1=\lambda_2=2$（二重），$\lambda_3=-4$。

**第二步：$\lambda=-4$ 的特征向量。** 解 $(A+4E)\boldsymbol x=\boldsymbol 0$：

$$
A+4E=\begin{pmatrix}7&2&-1\\-2&2&2\\3&6&3\end{pmatrix}
\longrightarrow
\begin{pmatrix}1&-1&-1\\0&3&2\\0&0&0\end{pmatrix}.
$$

（第二行乘 $-\tfrac12$ 得 $(1,-1,-1)$，第三行乘 $\tfrac13$ 得 $(1,2,1)$；第一行减 $7$ 倍第二行得 $(0,9,6)$，第三行减第二行得 $(0,3,2)$，二者同解。）

由 $3x_2+2x_3=0$ 得 $x_2=-\tfrac23x_3$，回代得 $x_1=x_2+x_3=\tfrac13x_3$。取 $x_3=3$：

$$
\boldsymbol p=k\,(1,-2,3)^{\mathrm T},\qquad k\ne 0 .
$$

**第三步：$\lambda=2$ 的特征向量。** 解 $(A-2E)\boldsymbol x=\boldsymbol 0$：

$$
A-2E=\begin{pmatrix}1&2&-1\\-2&-4&2\\3&6&-3\end{pmatrix},\qquad r_2=-2r_1,\ r_3=3r_1 ,
$$

秩为 $1$，只有一个方程 $x_1+2x_2-x_3=0$，即 $x_1=-2x_2+x_3$。取 $(x_2,x_3)=(1,0)$ 与 $(0,1)$：

$$
\boldsymbol p=k_1(-2,1,0)^{\mathrm T}+k_2(1,0,1)^{\mathrm T},\qquad k_1,k_2\ \text{不全为零}.
$$

**结论**：$\lambda=2$（二重）的特征向量为上式；$\lambda=-4$ 的特征向量为 $k(1,-2,3)^{\mathrm T}$，$k\ne0$。二重特征值对应 2 个线性无关的特征向量，故 $A$ 可对角化。

**验算**（逐一代回 $A\boldsymbol p=\lambda\boldsymbol p$）：

$$
A(1,-2,3)^{\mathrm T}=(3-4-3,\ -2+4+6,\ 3-12-3)^{\mathrm T}=(-4,8,-12)^{\mathrm T}=-4(1,-2,3)^{\mathrm T}\ ✓
$$

$$
A(-2,1,0)^{\mathrm T}=(-6+2,\ 4-2,\ -6+6)^{\mathrm T}=(-4,2,0)^{\mathrm T}=2(-2,1,0)^{\mathrm T}\ ✓
$$

$$
A(1,0,1)^{\mathrm T}=(3-1,\ -2+2,\ 3-1)^{\mathrm T}=(2,0,2)^{\mathrm T}=2(1,0,1)^{\mathrm T}\ ✓
$$

另有 $\operatorname{tr}A=0=2+2-4$、$|A|=-16=2\cdot2\cdot(-4)$，与特征值相符。

---

## 1.(4) 反序置换矩阵的特征值
<!-- homework-topic: 反序置换矩阵的特征值 -->

**原题**：求下列矩阵的特征值和特征向量：

$$
B=\begin{pmatrix}
0&0&0&1\\
0&0&1&0\\
0&1&0&0\\
1&0&0&0
\end{pmatrix}.
$$

**补充解答**

**第一步：看出它的作用。** 对 $\boldsymbol x=(x_1,x_2,x_3,x_4)^{\mathrm T}$，

$$
B\boldsymbol x=(x_4,\ x_3,\ x_2,\ x_1)^{\mathrm T},
$$

即把第 1、4 分量互换，第 2、3 分量互换。由此 $B^{\mathrm T}=B$，且

$$
B^2=E,\qquad B\,\boldsymbol x=\boldsymbol x\iff x_1=x_4,\ x_2=x_3;\qquad
B\,\boldsymbol x=-\boldsymbol x\iff x_1=-x_4,\ x_2=-x_3 .
$$

**第二步：特征值与重数。** 由 $B^2=E$ 知特征值只能是 $\pm1$；又 $\operatorname{tr}B=0$，故 $1$ 与 $-1$ 各出现 2 次：

$$
|\lambda E-B|=(\lambda-1)^2(\lambda+1)^2 .
$$

**第三步：特征向量。**

$$
\lambda=1:\quad \boldsymbol p=k_1(1,0,0,1)^{\mathrm T}+k_2(0,1,1,0)^{\mathrm T};
$$

$$
\lambda=-1:\quad \boldsymbol p=k_3(1,0,0,-1)^{\mathrm T}+k_4(0,1,-1,0)^{\mathrm T},
$$

其中 $k_i$ 不全为零（$\lambda=1$ 时也可取 $(1,1,1,1)^{\mathrm T}$ 作代表）。每个特征值都取到 2 个线性无关的特征向量，故 $B$ 可对角化（$B$ 本身是对称矩阵，结论一致）。

**验算**：$B(1,0,0,1)^{\mathrm T}=(1,0,0,1)^{\mathrm T}$ ✓，$B(0,1,1,0)^{\mathrm T}=(0,1,1,0)^{\mathrm T}$ ✓，$B(1,0,0,-1)^{\mathrm T}=(-1,0,0,1)^{\mathrm T}=-(1,0,0,-1)^{\mathrm T}$ ✓，$B(0,1,-1,0)^{\mathrm T}=(0,-1,1,0)^{\mathrm T}=-(0,1,-1,0)^{\mathrm T}$ ✓。又 $\operatorname{tr}B=0=1+1-1-1$、$|B|=1=1\cdot1\cdot(-1)\cdot(-1)$，与所得谱相符。

---

## 2.(1) 对角为零、其余全为 1 的 n 阶矩阵
<!-- homework-topic: 对角为零的全一矩阵 -->

**原题**：求下列 $n$ 阶矩阵的特征值和特征向量：

$$
J=\begin{pmatrix}
0&1&1&\cdots&1\\
1&0&1&\cdots&1\\
1&1&0&\cdots&1\\
\vdots&\vdots&\vdots&&\vdots\\
1&1&1&\cdots&0
\end{pmatrix}.
$$

**补充解答**

记 $\boldsymbol e=(1,1,\cdots,1)^{\mathrm T}\in\mathbb R^n$，则 $J=\boldsymbol e\boldsymbol e^{\mathrm T}-E$，这一步把「每行和相同」的结构直接变成可算的秩 1 修正。

**第一步：两个方向的验算。** 每行有 $n-1$ 个 $1$，故

$$
J\boldsymbol e=(n-1)\boldsymbol e .
$$

若 $\boldsymbol e^{\mathrm T}\boldsymbol v=\sum_i v_i=0$，则

$$
J\boldsymbol v=(\boldsymbol e^{\mathrm T}\boldsymbol v)\boldsymbol e-\boldsymbol v=-\boldsymbol v .
$$

而 $\{\boldsymbol v:\boldsymbol e^{\mathrm T}\boldsymbol v=0\}$ 是 $n-1$ 维的（超平面），故

$$
\lambda_1=n-1\ (\text{一重}),\qquad \lambda_2=-1\ (n-1\ \text{重}).
$$

**第二步：特征多项式（复核重数）。**

$$
|\lambda E-J|=\bigl|(\lambda+1)E-\boldsymbol e\boldsymbol e^{\mathrm T}\bigr|
=(\lambda+1)^n-n(\lambda+1)^{n-1}=(\lambda+1)^{n-1}\bigl(\lambda-(n-1)\bigr),
$$

其中用了秩 1 矩阵 $\boldsymbol e\boldsymbol e^{\mathrm T}$ 的特征值为 $n$（对应 $\boldsymbol e$）与 $0$（$n-1$ 重）。

**第三步：特征向量。**

$$
\lambda=n-1:\quad \boldsymbol p=k(1,1,\cdots,1)^{\mathrm T},\qquad k\ne0;
$$

$$
\lambda=-1:\quad \boldsymbol p=\sum_{i=1}^{n-1}k_i(\boldsymbol e_i-\boldsymbol e_{i+1}),\qquad k_i\ \text{不全为零},
$$

即「分量之和为 $0$ 的非零向量」全体，是一个 $n-1$ 维子空间。

**验算**：取 $n=3$，$J_3=\begin{pmatrix}0&1&1\\1&0&1\\1&1&0\end{pmatrix}$，$\operatorname{tr}J_3=0=2-1-1$，$|J_3|=2$，而 $2\cdot(-1)\cdot(-1)=2$ ✓；又 $J_3(1,1,1)^{\mathrm T}=(2,2,2)^{\mathrm T}$ ✓，$J_3(1,-1,0)^{\mathrm T}=(-1,1,0)^{\mathrm T}=-(1,-1,0)^{\mathrm T}$ ✓。$n=4$ 时 $\operatorname{tr}J=0=3-1-1-1$、$|J|=3\cdot(-1)^3=-3$ ✓。

（题面矩阵按 $n\ge2$ 理解；$n=1$ 时该矩阵为 $(0)$，只有一个特征值 $0$，公式中的「$n-1$ 重」需另行解释。）

---

## 3. 证明 $|A|/\lambda$ 是 $A^*$ 的特征值
<!-- homework-topic: 伴随矩阵的特征值 -->

**原题**：设 $\lambda$ 是 $n$ 阶可逆矩阵 $A$ 的一个特征值，$\boldsymbol\alpha$ 是 $A$ 的属于特征值 $\lambda$ 的一个特征向量。证明 $\dfrac{|A|}{\lambda}$ 是 $A^*$ 的一个特征值，$\boldsymbol\alpha$ 也是 $A^*$ 属于此特征值的一个特征向量。

**补充解答**

**第一步：$\lambda\ne0$，分母有意义。** 若 $\lambda=0$，则 $A\boldsymbol\alpha=\boldsymbol 0$ 而 $\boldsymbol\alpha\ne\boldsymbol 0$，即 $A$ 有非零解，与 $A$ 可逆矛盾。（也可用 $|A|=\lambda_1\lambda_2\cdots\lambda_n\ne0$ 直接看出所有特征值非零。）

**第二步：用伴随矩阵的基本等式，不必求逆。** 由 $A^*A=|A|E$，右乘 $\boldsymbol\alpha$：

$$
A^*A\boldsymbol\alpha=|A|\boldsymbol\alpha
\Longrightarrow
\lambda A^*\boldsymbol\alpha=|A|\boldsymbol\alpha
\Longrightarrow
A^*\boldsymbol\alpha=\frac{|A|}{\lambda}\boldsymbol\alpha .
$$

**第三步：特征向量要求非零。** $\boldsymbol\alpha\ne\boldsymbol 0$ 是题设，故 $\boldsymbol\alpha$ 确实是 $A^*$ 的属于特征值 $\dfrac{|A|}{\lambda}$ 的特征向量。

**另证（同一结论）**：$A$ 可逆时 $A^*=|A|A^{-1}$，而 $A^{-1}\boldsymbol\alpha=\dfrac{1}{\lambda}\boldsymbol\alpha$，故 $A^*\boldsymbol\alpha=|A|A^{-1}\boldsymbol\alpha=\dfrac{|A|}{\lambda}\boldsymbol\alpha$。

**验算**（取对角阵代入检验）：$A=\operatorname{diag}(2,3)$，$|A|=6$，$A^*=\operatorname{diag}(3,2)$。$\lambda=2$ 时 $\dfrac{|A|}{\lambda}=3$，$\boldsymbol\alpha=(1,0)^{\mathrm T}$ 满足 $A^*\boldsymbol\alpha=(3,0)^{\mathrm T}=3\boldsymbol\alpha$ ✓；$\lambda=3$ 时 $\dfrac{|A|}{\lambda}=2$，$\boldsymbol\alpha=(0,1)^{\mathrm T}$ 满足 $A^*\boldsymbol\alpha=(0,2)^{\mathrm T}=2\boldsymbol\alpha$ ✓。

---

## 5. 证明 $\boldsymbol\alpha_1+\boldsymbol\alpha_2$ 不是特征向量
<!-- homework-topic: 特征向量的和是否仍为特征向量 -->

**原题**：设 $\lambda_1,\lambda_2$ 是矩阵 $A$ 的两个不同的特征值，$\boldsymbol\alpha_1,\boldsymbol\alpha_2$ 分别是属于 $\lambda_1,\lambda_2$ 的特征向量。试证：$\boldsymbol\alpha_1+\boldsymbol\alpha_2$ 一定不是 $A$ 的特征向量。

**补充解答**

**第一步：先确认 $\boldsymbol\alpha_1+\boldsymbol\alpha_2\ne\boldsymbol 0$。** 「属于不同特征值的特征向量线性无关」是基本引理，故 $\boldsymbol\alpha_1,\boldsymbol\alpha_2$ 线性无关；若 $\boldsymbol\alpha_1+\boldsymbol\alpha_2=\boldsymbol 0$ 则二者成比例，矛盾。所以 $\boldsymbol\alpha_1+\boldsymbol\alpha_2$ 至少是候选向量，可以谈「是不是特征向量」。

**第二步：反证。** 设存在 $\mu$ 使

$$
A(\boldsymbol\alpha_1+\boldsymbol\alpha_2)=\mu(\boldsymbol\alpha_1+\boldsymbol\alpha_2).
$$

左边按特征值展开：

$$
A\boldsymbol\alpha_1+A\boldsymbol\alpha_2=\lambda_1\boldsymbol\alpha_1+\lambda_2\boldsymbol\alpha_2 .
$$

两式相减：

$$
(\lambda_1-\mu)\boldsymbol\alpha_1+(\lambda_2-\mu)\boldsymbol\alpha_2=\boldsymbol 0 .
$$

因 $\boldsymbol\alpha_1,\boldsymbol\alpha_2$ 线性无关，必有

$$
\lambda_1-\mu=0,\qquad \lambda_2-\mu=0,
$$

即 $\lambda_1=\lambda_2=\mu$，与 $\lambda_1\ne\lambda_2$ 矛盾。故不存在这样的 $\mu$，$\boldsymbol\alpha_1+\boldsymbol\alpha_2$ 不是 $A$ 的特征向量。

**反面检验（说明条件不能省）**：若两特征值相同，结论就失效。例如 $A=E$，$\lambda_1=\lambda_2=1$，$\boldsymbol\alpha_1=(1,0)^{\mathrm T}$、$\boldsymbol\alpha_2=(0,1)^{\mathrm T}$ 都是特征向量，而 $\boldsymbol\alpha_1+\boldsymbol\alpha_2=(1,1)^{\mathrm T}$ 仍是特征向量（$A\boldsymbol x=1\cdot\boldsymbol x$）。可见「$\lambda_1\ne\lambda_2$」正是结论成立的关键。

---

## 10. 由相似关系求 $a,b$
<!-- homework-topic: 利用相似关系求矩阵参数 -->

**原题**：矩阵

$$
A=\begin{pmatrix}
3&2&-1\\
-2&a&2\\
3&6&-1
\end{pmatrix}
\quad\text{与矩阵}\quad
B=\begin{pmatrix}
-4&0&0\\
0&b&0\\
0&0&2
\end{pmatrix}
$$

相似，试求 $a,b$ 的值。

**补充解答**

相似矩阵的特征多项式相同，故三个系数（迹、二阶主子式之和、行列式）必须分别相等。

**（1）迹：**

$$
\operatorname{tr}A=a+2,\qquad \operatorname{tr}B=b-2
\Longrightarrow a-b=-4 .
$$

**（2）二阶主子式之和：**

$$
s_2(A)=(-a-12)+0+(3a+4)=2a-8,
$$

$$
s_2(B)=(-4b)+(-8)+(2b)=-2b-8
\Longrightarrow 2a-8=-2b-8\Longrightarrow a=-b .
$$

**（3）行列式：** 展开时 $a$ 的项恰好抵消，

$$
|A|=3(-a-12)-2(2-6)+(-1)(-12-3a)=-3a-36+8+12+3a=-16 ,
$$

$$
|B|=-8b\Longrightarrow -8b=-16\Longrightarrow b=2 .
$$

由 $b=2$ 与 $a=-b$ 得 $a=-2$；代回 $\operatorname{tr}$ 的关系 $-2-2=-4$ ✓，三组等式互相吻合。

**结论**：$a=-2$，$b=2$。

**验算**：此时 $A$ 恰为第 1.(2) 题的矩阵（把 $a=-2$ 代回即得），其特征多项式

$$
\lambda^3-12\lambda+16=(\lambda-2)^2(\lambda+4),
$$

而 $B=\operatorname{diag}(-4,2,2)$ 的特征多项式同为 $(\lambda+4)(\lambda-2)^2$ ✓，两者确有相同谱，与「相似」相容。（此处特征值相同且均为 $2,2,-4$，与 $a=-2$ 的取值对应。）

**说明**：$|A|$ 与 $a$ 无关这一点值得注意——它意味着仅用行列式只能定出 $b$，必须再配合迹或二阶主子式才能定出 $a$；三式联立既给出答案，也互相校验。

---

## 11. 含参矩阵的二重特征值与可对角化
<!-- homework-topic: 重特征值与矩阵对角化 -->

**原题**：已知 $\lambda=1$ 是矩阵

$$
A=\begin{pmatrix}
2&1&1\\
1&2&t\\
1&t&t+1
\end{pmatrix}
$$

的二重特征值，求 $t$ 的值，并求是否存在可逆矩阵 $T$ 使得 $T^{-1}AT$ 为对角矩阵。

**补充解答**

**第一步：先定 $t$。** $\lambda=1$ 是特征值，当且仅当 $|A-E|=0$：

$$
|A-E|=\begin{vmatrix}1&1&1\\1&1&t\\1&t&t\end{vmatrix}
=(t-t^2)-0+(t-1)=-t^2+2t-1=-(t-1)^2 .
$$

于是 $|A-E|=0\iff t=1$；且该式在 $t=1$ 处恰为二重零点，说明使 $1$ 成为特征值的 $t$ 唯一，且此时重数为 2。故 **$t=1$**。

**第二步：确认 $t=1$ 确为二重特征值。** 此时

$$
A=\begin{pmatrix}2&1&1\\1&2&1\\1&1&2\end{pmatrix}=E+\boldsymbol e\boldsymbol e^{\mathrm T},\qquad \boldsymbol e=(1,1,1)^{\mathrm T},
$$

$$
A\boldsymbol e=(2+1+1)\boldsymbol e=4\boldsymbol e,\qquad
A\boldsymbol v=\boldsymbol v\quad(\boldsymbol e^{\mathrm T}\boldsymbol v=0),
$$

故特征值为 $4$（一重，特征向量 $\boldsymbol e$）与 $1$（二重），且

$$
|\lambda E-A|=\bigl|(\lambda-1)E-\boldsymbol e\boldsymbol e^{\mathrm T}\bigr|=(\lambda-1)^2(\lambda-4).
$$

**第三步：可对角化，并给出 $T$。** $A$ 是实对称矩阵，必可正交对角化（也可直接验算：$r(A-E)=1$，故 $\dim\ker(A-E)=3-1=2$，等于代数重数）。

$$
T=\begin{pmatrix}
1&1&1\\
1&-1&0\\
1&0&-1
\end{pmatrix},\qquad |T|=3\ne0 ,
$$

其第 1 列为 $\lambda=4$ 的特征向量，第 2、3 列为 $\lambda=1$ 的两个特征向量。于是

$$
T^{-1}AT=\operatorname{diag}(4,1,1).
$$

**结论**：$t=1$；存在可逆矩阵 $T$（例如上式），使 $T^{-1}AT$ 为对角矩阵 $\operatorname{diag}(4,1,1)$。$T$ 不唯一，把特征向量任取非零倍数或作正交化都可。

**验算**：

$$
A(1,1,1)^{\mathrm T}=(4,4,4)^{\mathrm T}=4(1,1,1)^{\mathrm T}\ ✓
$$

$$
A(1,-1,0)^{\mathrm T}=(2-1,\ 1-2,\ 1-1)^{\mathrm T}=(1,-1,0)^{\mathrm T}\ ✓
$$

$$
A(1,0,-1)^{\mathrm T}=(2-1,\ 1-1,\ 1-2)^{\mathrm T}=(1,0,-1)^{\mathrm T}\ ✓
$$

再由 $\operatorname{tr}A=6=4+1+1$、$|A|=4$（$=4\cdot1\cdot1$）复核谱 $4,1,1$ ✓；三列线性无关（$|T|=3$），故 $T$ 可逆、对角化成立。
