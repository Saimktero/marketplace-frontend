export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Количество страниц определяется как siblingCount + Первая страница + Последняя страница + Текущая страница + 2*ТОЧКИ
    const totalPageNumbers = siblingCount + 5;

    /*
      Случай 1:
      Если количество страниц меньше, чем номера страниц, которые мы хотим отобразить в нашем
      компоненте paginationComponent, мы возвращаем диапазон [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    /*
       Рассчитываем индекс левого и правого родственных элементов чтобы убедиться, что они находятся в пределах диапазона 1 и totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
    Мы не показываем точки только в том случае, если между крайними значениями sibling и ограничениями страницы, т.е. 1 и totalPageCount, нужно вставить только один номер страницы. Следовательно, мы используем leftSiblingIndex > 2 и rightSiblingIndex < totalPageCount - 2    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
        Случай 2: Точки слева не отображаются, но должны отображаться точки справа
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    /*
        Случай 3: Правых точек для отображения нет, но должны быть показаны левые точки
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {

      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
        Случай 4: Будут показаны как левая, так и правая точки
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};