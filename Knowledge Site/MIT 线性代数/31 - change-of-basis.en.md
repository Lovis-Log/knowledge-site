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

1. Why is the standard basis inefficient for an image that is a single solid color?
2. Which JPEG step is lossless, and which is lossy?
3. Why can a wavelet basis be both fast and orthogonal?
4. What goes wrong with a basis that is orthogonal but not sparse?
5. If $B=M^{-1}AM$, what do the columns of $M$ represent in the new basis?

## How this connects to the course

The previous lecture showed how bases construct matrices; this one applies basis changes to compression and returns to similarity: one transformation, different bases, similar matrices. The next lecture is the third quiz review, tying eigenvalues, symmetric matrices, positive definiteness, similarity, and SVD into a set of typical problems.
