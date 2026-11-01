---
slug: "31-change-of-basis"
title: "Change of Basis and Image Compression: Three Tests for a Good Basis"
summary: "A change of basis solves P = Wc; a good basis is fast, sparse, and ideally orthogonal. JPEG uses small Fourier blocks, wavelets compete with it, and one transformation in two bases yields similar matrices."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "change-of-basis"
  - "image-compression"
  - "wavelets"
sources:
  - kind: "video"
    title: "31. Change of Basis; Image Compression"
    url: "https://www.youtube.com/watch?v=0h43aV4aH7I"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2019-09-25"
---

## An image is a very long vector

A $512\times512$ grayscale image has $512^2=262144$ pixels, each an integer from $0$ to $255$, that is, eight bits. Laid out row by row, the image is a vector in $\mathbb R^{262144}$. A color image needs three channels, tripling the length.

Compression starts here: **the information is too large to transmit directly**.

### Why the standard basis is poor

The standard basis treats each pixel as its own coordinate direction. But natural images are highly correlated locally: across a blue shirt or a dark blackboard, neighboring values differ only slightly.

For a nearly uniform region, the standard basis still needs hundreds of nonzero coordinates, one per pixel. It ignores the very structure that makes compression possible.

Changing basis aims at a different representation in which **a few coefficients summarize an entire block**.

## Timeline

| Time | Topic |
| --- | --- |
| 0:07 | Image compression and change of basis |
| 1:38 | The central question of change of basis |
| 3:02 | Pixels, lossless compression, information |
| 3:28 | The data in a $512\times512$ image |
| 6:52 | Neighbouring pixels are highly correlated |
| 7:59 | The first good basis vector: all ones |
| 11:07 | The JPEG basis and 8 by 8 blocks |
| 13:46 | Change basis, compress, change back |
| 14:43 | Lossy compression: discarding small coefficients |
| 17:26 | The fingerprint compression story |
| 22:00 | Constructing the wavelet basis |
| 24:21 | Representing an image by basis coefficients |
| 28:46 | A good basis must be fast and sparse |
| 30:54 | The fast wavelet transform |
| 31:14 | The wavelet basis is not orthonormal |
| 35:56 | How a matrix relates under two bases |
| 39:52 | $A$ and $B$ are similar |
| 43:18 | Finding the matrix in the new basis |
| 47:08 | An eigenvector basis diagonalizes the matrix |

## What a good basis should contain

The most obviously useful vector is the **all-ones vector**:

$$
(1,1,\dots,1).
$$

A solid-color image needs only this direction and one coefficient. It is not in the standard basis — and that is exactly the freedom a change of basis gives.

The second useful family is the **checkerboard vector** $(1,-1,1,-1,\dots)$, describing rapid alternation. More common in real images is a **half-light, half-dark** vector, with $1$ on one half and $-1$ on the other.

These correspond to constant (zero frequency), slow variation (low frequency), and rapid alternation (high frequency).

> Choosing a basis is a billion-dollar engineering decision. Television standards, film standards, and JPEG all rest on different answers to this linear algebra question.

## How JPEG works

### Blocking

A full $512\times512$ image is too large to handle at once, so JPEG splits it into $8\times8$ blocks of $64$ pixels and compresses each block in a $64$-dimensional space.

### Step one: change basis (lossless)

Within a block, the $64$ pixel values are expressed in a Fourier (more precisely, discrete cosine) basis:

$$
x=Wc.
$$

Sixty-four pixels go in, sixty-four coefficients come out. This step only changes coordinates; no information is lost.

The Fourier basis includes the constant vector (the DC component) and vectors that alternate at various frequencies.

### Step two: threshold (lossy)

Natural images concentrate energy at low frequencies: the constant and slowly varying coefficients are large, high-frequency coefficients are small. Set a threshold and zero out the small ones:

$$
\hat c=\text{threshold}(c).
$$

Most high-frequency coefficients disappear.

### Step three: reconstruct

$$
\hat x=W\hat c.
$$

With only two or three coefficients kept, a $64$-dimensional block is reduced to about three numbers — roughly $21:1$ compression. The eye barely notices, because what was discarded was the faint high-frequency detail.

> The key distinction: **the change of basis is lossless; compression happens at thresholding**. The first is linear algebra; the second exploits the empirical fact that signals are sparse in a good basis.

### Fingerprints and video

- **Fingerprints:** the FBI's archive held tens of millions of cards, and digitized images were still enormous. Compression made indexing feasible, cutting a query from a week to minutes. The basis chosen was not the simplest Haar wavelet but a smoother one.
- **Video:** consecutive frames are highly correlated, so an encoder records a prediction plus a correction and compresses only the correction. The correlation is temporal instead of spatial.

## The wavelet basis

The competitor to Fourier is the **wavelet** basis. In $\mathbb R^8$, one simple Haar wavelet basis is

$$
\begin{aligned}
&(1,1,1,1,1,1,1,1),\\
&(1,1,1,1,-1,-1,-1,-1),\\
&(1,1,-1,-1,0,0,0,0),\\
&(0,0,0,0,1,1,-1,-1),\\
&(1,-1,0,0,0,0,0,0),\\
&(0,0,1,-1,0,0,0,0),\\
&(0,0,0,0,1,-1,0,0),\\
&(0,0,0,0,0,0,1,-1).
\end{aligned}
$$

Every entry is $1$, $-1$, or $0$, so multiplication is just addition and subtraction. The vectors are pairwise orthogonal, with lengths $\sqrt8,\sqrt4,\sqrt2,\dots,\sqrt2$; normalizing gives an orthonormal basis.

### Transforming with wavelets

Put the eight pixel values in a vector $P$ and the wavelet basis vectors in the columns of $W$. Then

$$
P=Wc,\qquad c=W^{-1}P.
$$

After normalization the columns are orthonormal, so $W^{-1}=W^{\mathsf T}$: the forward and inverse transforms are both just matrix multiplications.

## Three tests for a good basis

| Test | Meaning | Why it matters |
| --- | --- | --- |
| Fast | Both transform and inverse are cheap | Image volumes are enormous; twice as slow is unusable |
| Sparse | A few coefficients reconstruct the signal | This is where compression comes from |
| Orthogonal | $W^{-1}=W^{\mathsf T}$ | The inverse is as fast as the forward transform, and numerically stable |

Fourier passes all three: FFT, energy concentration, orthogonality (in the complex version). Wavelets pass as well: a fast wavelet transform and orthogonal columns.

The fastest "basis" is no change at all — the standard basis costs nothing. But it compresses badly: discard $90\%$ of the pixel values and the image darkens and breaks. **Speed and sparsity are both required.**

## Change of basis and similar matrices

Return to linear transformations.

Let $T$ map an $n$-dimensional space to itself. In the basis $v_1,\dots,v_n$ its matrix is $A$; in another basis $w_1,\dots,w_n$ its matrix is $B$. Then

$$
B=M^{-1}AM,
$$

where $M$ is the change-of-basis matrix whose columns are the new basis vectors expressed in the old basis.

This is the origin of similarity: **one transformation, two bases, similar matrices**.

### The eigenvector basis is best

If every basis vector is an eigenvector, then

$$
T(v_i)=\lambda_iv_i.
$$

By the construction rule, the coordinates of $T(v_i)$ are zero except in position $i$, where the value is $\lambda_i$. Hence the matrix is diagonal:

$$
\Lambda=\operatorname{diag}(\lambda_1,\dots,\lambda_n).
$$

This is why diagonalization matters: it writes the transformation as independent stretching along each direction.

> For image compression, the eigenvector basis would be optimal in theory, but finding eigenvectors of a $512^2$-dimensional matrix is far too expensive. Practice chooses a basis that is good enough and fast, such as wavelets or Fourier.

## Common mistakes

1. **Thinking a change of basis changes the vector.** The vector is unchanged; only its coordinates change.
2. **Attributing compression to the change of basis.** The basis change is lossless; compression comes from thresholding small coefficients.
3. **Ignoring speed in favor of compression ratio.** A basis with a spectacular ratio but a slow transform is useless in practice.
4. **Assuming all orthogonal bases are equally good.** Orthogonality makes inversion convenient; sparsity depends on how well the basis matches the signal.

## Takeaways

- An image is a high-dimensional vector, and the standard basis ignores local correlation.
- A good basis is fast, sparse, and preferably orthogonal.
- JPEG uses a Fourier (cosine) basis on $8\times8$ blocks; the basis change is lossless and thresholding is lossy.
- Wavelets compete with Fourier and are used in JPEG 2000.
- The matrix form of a basis change is $P=Wc$, $c=W^{-1}P$.
- One transformation in two bases gives similar matrices $B=M^{-1}AM$; the eigenvector basis gives a diagonal matrix.

## Check your understanding

**1. Why is the standard basis inefficient for an image that is a single solid color?**

Reference answer: Each coordinate direction of the standard basis corresponds to a single pixel, so representing a solid $8\times8$ block needs $64$ nonzero coefficients — one per pixel — even though the values are nearly identical. The real structure of a solid block is one amplitude along the all-ones direction; that direction is not in the standard basis, so it must be assembled from many coordinates. The standard basis ignores the strong correlation between neighbouring pixels, so the number of coefficients cannot shrink and compression has nothing to exploit.

**2. Which JPEG step is lossless, and which is lossy?**

Reference answer: The basis change $x=Wc$ is lossless: it merely rewrites the $64$ pixel values as $64$ Fourier (cosine) coefficients, and $c=W^{-1}x$ recovers them exactly. Thresholding $\hat c=\operatorname{threshold}(c)$ is lossy: coefficients with small magnitude are set to zero and that information is gone for good. Reconstruction $\hat x=W\hat c$ is exact for the retained coefficients, but cannot restore the discarded ones. Compression therefore happens in the thresholding step, not in the basis change.

**3. Why can a wavelet basis be both fast and orthogonal?**

Reference answer: Fast, because every Haar wavelet vector has entries in $\{1,-1,0\}$, so the forward and inverse transforms need only additions and subtractions — no multiplications — and the fast wavelet transform on a signal of length $n$ costs $O(n)$. Orthogonal, because the vectors have pairwise zero inner products; for example $(1,1,1,1,-1,-1,-1,-1)$ and $(1,1,-1,-1,0,0,0,0)$ have inner product $1+1-1-1=0$. After normalization $W^{-1}=W^{\mathsf T}$, so the inverse is as cheap as the forward transform and numerically stable. Both properties come from the same $\pm1$ structure, which is why they hold together.

**4. What goes wrong with a basis that is orthogonal but not sparse?**

Reference answer: Orthogonality makes inversion easy ($W^{-1}=W^{\mathsf T}$) and numerically stable, but compression depends on how many coefficients are small. If the representation is not sparse, the signal's energy is spread over many coefficients: thresholding would discard genuinely important information, forcing you either to keep many coefficients (low compression) or to accept visible reconstruction error. The standard basis is the extreme case — orthogonal, yet completely non-sparse for natural images, so dropping $90\%$ of pixels darkens and damages the picture. Orthogonality is only one of the three criteria and cannot substitute for sparsity.

**5. If $B=M^{-1}AM$, what do the columns of $M$ represent in the new basis?**

Reference answer: The columns of $M$ are the coordinates of the new basis vectors expressed in the old basis. If the old basis is $v_1,\dots,v_n$ and the new one is $w_1,\dots,w_n$, column $j$ holds the coefficients of $w_j$ in the old basis. Thus $M$ converts new coordinates to old ones: if $x_{\text{new}}$ holds the coordinates of a vector in the new basis, then $x_{\text{old}}=Mx_{\text{new}}$. The formula $B=M^{-1}AM$ says exactly this: translate new coordinates to old with $M$, apply $A$, and translate back with $M^{-1}$.

## How this connects to the course

The previous lecture showed how bases construct matrices; this one applies basis changes to compression and returns to similarity: one transformation, different bases, similar matrices. The next lecture is the third quiz review, tying eigenvalues, symmetric matrices, positive definiteness, similarity, and SVD into a set of typical problems.
