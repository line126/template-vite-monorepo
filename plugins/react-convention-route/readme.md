## 错误的使用方式

```
src\pages\SameName\index.tsx
src\pages\SameName.tsx
```

```
src\pages\SameName\A.tsx
src\pages\SameName\B.tsx
src\pages\SameName.tsx
```

```
// 1. root index route path: '/'
// 2. nested children route path
//    - dir
//      - some.ts  -> 'some'
//      - index.ts -> ''
//    - dir.tsx    -> '/dir'
```

## 部分正常的情况

```
src\pages\SameName\index.tsx
src\pages\SameName\A.tsx
src\pages\SameName\B.tsx
```

```
src\pages\SameName.tsx
```
