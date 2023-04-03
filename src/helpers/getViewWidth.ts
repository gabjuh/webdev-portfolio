export const getViewWidth = (): number => {
  const viewWidth = document.querySelector('body') as HTMLElement;
  return viewWidth?.offsetWidth;
};