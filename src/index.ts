// @ts-ignore
import youpayIcon from './assets/youpayIcon.svg?raw'

miro.onReady(() => {
  miro.initialize({
    extensionPoints: {
      toolbar: {
        title: 'YouPay Custom Icons',
        toolbarSvgIcon: youpayIcon,
        librarySvgIcon: youpayIcon,
        async onClick() {
          // Remember that 'app.html' resolves relative to index.js file. So app.html have to be in the /dist/ folder.
          await miro.board.ui.openLibrary('app.html', {
            title: 'YouPay Custom Icons',
          });
        },
      },
    },
  });
});
