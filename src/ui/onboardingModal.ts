import { dom } from "./domElements";
import { getOnboardingSeen, saveOnboardingSeen } from "../storage/setting";


//โชว์ popup
export function openOnboardingModal(): void {
  dom.onBoardingModalEl.classList.remove('hidden')
  dom.modalViewWelcomeEl.classList.remove('hidden')
  dom.modalViewInstallEl.classList.add('hidden')
}


//ปิด popup
export function closeOnboardingModal(): void {
  dom.onBoardingModalEl.classList.add('hidden');
}

//สลับหน้าแนะนำกับการติดตั้ง
export function switchModalView(view: 'welcome' | 'install'): void {
  if (view === 'install') {
    dom.modalViewInstallEl.classList.remove('hidden')
    dom.modalViewWelcomeEl.classList.add('hidden')
  } else if (view === 'welcome') {
    dom.modalViewInstallEl.classList.add('hidden')
    dom.modalViewWelcomeEl.classList.remove('hidden')
  }
}

//สลับโหมดการติดตั้ง ios / android
export function switchInstallTab(os: 'android' | 'ios'): void {
  if (os === 'ios') {
    dom.btnTabIos.classList.add('active')
    dom.stepsIos.classList.remove('hidden')
    dom.stepsAndroid.classList.add('hidden')
    dom.btnTabAndroid.classList.remove('active')
  } else if (os === 'android') {
    dom.btnTabAndroid.classList.add('active')
    dom.stepsIos.classList.add('hidden')
    dom.stepsAndroid.classList.remove('hidden')
    dom.btnTabIos.classList.remove('active')
  }
}

//ศูนย์ควบคุ้มหน้า popup
export function initOnboardingModal(): void {
  dom.btnToInstall.addEventListener('click', () => {
    switchModalView('install');
  });
  dom.btnToWelcome.addEventListener('click', () => {
    switchModalView('welcome');
  });
  dom.btnTabIos.addEventListener('click', () => {
    switchInstallTab('ios');
  });
  dom.btnTabAndroid.addEventListener('click', () => {
    switchInstallTab('android');
  });
  dom.btnCloseOnboarding.addEventListener('click', () => {
    closeOnboardingModal();
    saveOnboardingSeen()
  });
  dom.btnCloseInstall.addEventListener('click', () => {
    closeOnboardingModal();
    saveOnboardingSeen()
  });
  dom.btnAdvice.addEventListener('click', () => {
    openOnboardingModal();
  });
  if (!getOnboardingSeen()) {
    openOnboardingModal()
  }
}