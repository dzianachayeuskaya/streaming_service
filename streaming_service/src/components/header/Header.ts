import { el } from 'redom';
import { UserAccount } from './UserAccount';
import { IUser } from '../../types/Interfaces/IUser';
import { AbstractComponent } from '../../types/AbstractComponent';

export class Header extends AbstractComponent {
  input: HTMLInputElement;
  constructor(private userData: IUser) {
    super(userData);
    this.input = el('input', {
      type: 'search',
      placeholder: 'ЧТО БУДЕМ ИСКАТЬ?',
    });
    this.input.classList.add('header__search__field');
  }

  protected getTemplate(userData: IUser) {
    const logo = el('a.header__logo', { href: '/' });
    logo.innerHTML = `<svg width="143" height="29" viewBox="0 0 143 29"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <path class="logo__icone"
      d="M16.2436 7.59621C14.7531 8.43737 12.6466 8.46264 11.1376 7.65815C10.0953 7.10241 8.9154 6.78904 7.66565 6.78904C3.43204 6.78904 0 10.3846 0 14.82C0 19.2554 3.43204 22.8509 7.66565 22.8509C8.97908 22.8509 10.2154 22.5048 11.296 21.895C12.7864 21.0538 14.893 21.0286 16.4019 21.8331C17.4443 22.3888 18.6242 28.5 19.8739 28.5C24.1076 28.5 33 19.1066 33 14.6713C33 10.2358 24.1076 0.5 19.8739 0.5C18.5605 0.5 17.3242 6.98636 16.2436 7.59621Z"
      fill="#FC6D3E" />
    <path class="logo__text"
      d="M41.8438 7.48145H47.7324C48.5527 7.48145 49.2412 7.53418 49.7979 7.63965C50.3604 7.74512 50.8232 7.88574 51.1865 8.06152C51.5557 8.2373 51.8369 8.44238 52.0303 8.67676C52.2295 8.90527 52.376 9.14844 52.4697 9.40625C52.5635 9.6582 52.6162 9.91602 52.6279 10.1797C52.6455 10.4375 52.6543 10.6836 52.6543 10.918V14.2666C52.6543 14.501 52.6455 14.75 52.6279 15.0137C52.6162 15.2715 52.5635 15.5264 52.4697 15.7783C52.376 16.0303 52.2295 16.2734 52.0303 16.5078C51.8369 16.7422 51.5557 16.9473 51.1865 17.123C50.8232 17.2988 50.3604 17.4395 49.7979 17.5449C49.2412 17.6504 48.5527 17.7031 47.7324 17.7031H46.2119V21.5H41.8438V7.48145ZM46.2119 15.7871H48.2861V9.56445H46.2119V15.7871ZM60.3623 21.5H55.9941V6.4707H60.3623V21.5ZM69.6348 21.5L69.2393 20.0322C69.0869 20.3311 68.8936 20.5918 68.6592 20.8145C68.4248 21.0371 68.1641 21.2246 67.877 21.377C67.5898 21.5234 67.2822 21.6318 66.9541 21.7021C66.6318 21.7783 66.3096 21.8164 65.9873 21.8164C65.3135 21.8164 64.748 21.7139 64.291 21.5088C63.8398 21.3096 63.4766 21.0459 63.2012 20.7178C62.9316 20.3838 62.7383 20.0059 62.6211 19.584C62.5098 19.1562 62.4541 18.7168 62.4541 18.2656C62.4541 17.8027 62.5215 17.3486 62.6562 16.9033C62.7969 16.4521 63.0342 16.0508 63.3682 15.6992C63.708 15.3418 64.1621 15.0547 64.7305 14.8379C65.3047 14.6211 66.0254 14.5127 66.8926 14.5127C67.1914 14.5127 67.5137 14.5215 67.8594 14.5391C68.2051 14.5566 68.5508 14.5859 68.8965 14.627V12.1836H66.8223V13.6514L63.3594 13.6426C63.2949 13.4141 63.2422 13.1885 63.2012 12.9658C63.1602 12.7432 63.1396 12.5293 63.1396 12.3242C63.1396 11.9727 63.2129 11.6387 63.3594 11.3223C63.5117 11 63.7695 10.7188 64.1328 10.4785C64.502 10.2383 64.9941 10.0479 65.6094 9.90723C66.2305 9.7666 67.0127 9.69629 67.9561 9.69629C68.8057 9.69629 69.5264 9.74902 70.1182 9.85449C70.71 9.95996 71.2021 10.1006 71.5947 10.2764C71.9873 10.4521 72.2949 10.6572 72.5176 10.8916C72.7402 11.1201 72.9072 11.3633 73.0186 11.6211C73.1299 11.873 73.1973 12.1309 73.2207 12.3945C73.25 12.6523 73.2646 12.8984 73.2646 13.1328V19.2412C73.2646 19.5225 73.2822 19.7949 73.3174 20.0586C73.3584 20.3223 73.4023 20.5625 73.4492 20.7793C73.5078 21.0312 73.5723 21.2715 73.6426 21.5H69.6348ZM66.8223 16.209V19.417H68.8965V16.209H66.8223ZM80.2256 19.417H82.2998V10.0742H86.668V20.9902C86.668 21.6758 86.5947 22.291 86.4482 22.8359C86.3076 23.3867 86.1084 23.873 85.8506 24.2949C85.5986 24.7168 85.2998 25.0771 84.9541 25.376C84.6084 25.6748 84.2334 25.918 83.8291 26.1055C83.4307 26.2988 83.0088 26.4395 82.5635 26.5273C82.124 26.6152 81.6846 26.6592 81.2451 26.6592C80.8467 26.6592 80.4541 26.624 80.0674 26.5537C79.6865 26.4834 79.3203 26.3809 78.9688 26.2461C78.623 26.1172 78.3037 25.959 78.0107 25.7715C77.7178 25.584 77.4629 25.373 77.2461 25.1387C77.0293 24.9102 76.8594 24.6611 76.7363 24.3916C76.6191 24.1221 76.5605 23.8379 76.5605 23.5391C76.5605 23.4102 76.5723 23.2783 76.5957 23.1436C76.6191 23.0088 76.6572 22.874 76.71 22.7393L81.1309 23.0029V23.5654H82.3086V20.6123C82.127 20.8174 81.916 20.999 81.6758 21.1572C81.4355 21.3154 81.1777 21.4473 80.9023 21.5527C80.6328 21.6641 80.3486 21.7461 80.0498 21.7988C79.751 21.8574 79.4521 21.8867 79.1533 21.8867C78.7373 21.8867 78.3301 21.8193 77.9316 21.6846C77.5391 21.5498 77.1875 21.3418 76.877 21.0605C76.5723 20.7793 76.3262 20.4248 76.1387 19.9971C75.9512 19.5635 75.8574 19.0537 75.8574 18.4678V10.0742H80.2256V19.417ZM95.6855 21.4912V25.3232H88.6191V21.4912H95.6855ZM97.7422 21.5V10.0742H101.354L101.759 11.542C101.911 11.2373 102.11 10.9707 102.356 10.7422C102.603 10.5078 102.878 10.3145 103.183 10.1621C103.487 10.0039 103.812 9.88672 104.158 9.81055C104.504 9.72852 104.855 9.6875 105.213 9.6875C105.629 9.6875 106.036 9.75488 106.435 9.88965C106.839 10.0244 107.196 10.2295 107.507 10.5049C107.823 10.7744 108.075 11.1172 108.263 11.5332C108.456 11.9492 108.553 12.4355 108.553 12.9922V21.5H104.185V12.1836H102.11V21.5H97.7422ZM115.303 19.417H117.377V12.1836H115.303V19.417ZM116.393 21.8428C115.514 21.8428 114.767 21.79 114.151 21.6846C113.542 21.5791 113.035 21.4385 112.631 21.2627C112.227 21.0869 111.91 20.8818 111.682 20.6475C111.459 20.4131 111.292 20.1699 111.181 19.918C111.069 19.666 110.999 19.4111 110.97 19.1533C110.946 18.8896 110.935 18.6406 110.935 18.4062V13.1328C110.935 12.8984 110.946 12.6523 110.97 12.3945C110.999 12.1309 111.069 11.873 111.181 11.6211C111.292 11.3633 111.459 11.1201 111.682 10.8916C111.91 10.6572 112.227 10.4521 112.631 10.2764C113.035 10.1006 113.542 9.95996 114.151 9.85449C114.767 9.74902 115.514 9.69629 116.393 9.69629C117.266 9.69629 118.004 9.74902 118.607 9.85449C119.217 9.95996 119.718 10.1006 120.11 10.2764C120.509 10.4521 120.816 10.6572 121.033 10.8916C121.256 11.1201 121.42 11.3633 121.525 11.6211C121.631 11.873 121.692 12.1309 121.71 12.3945C121.733 12.6523 121.745 12.8984 121.745 13.1328V18.4062C121.745 18.6406 121.733 18.8896 121.71 19.1533C121.692 19.4111 121.631 19.666 121.525 19.918C121.42 20.1699 121.256 20.4131 121.033 20.6475C120.816 20.8818 120.509 21.0869 120.11 21.2627C119.718 21.4385 119.217 21.5791 118.607 21.6846C118.004 21.79 117.266 21.8428 116.393 21.8428ZM131.606 15.0049L130.903 21.5H125.34L123.529 10.0742H127.88L128.557 17.8086L129.515 10.0742H133.751L134.691 17.8086L135.377 10.0742H139.736L137.926 21.5H132.327L131.606 15.0049Z"
      fill="#11253D" />
  </svg>`;

    const userAccount = new UserAccount(userData);

    const header = el('header.header flex', [
      logo,
      el('.header__search', this.input),
      userAccount.getElement(),
    ]);

    return header;
  }
}
