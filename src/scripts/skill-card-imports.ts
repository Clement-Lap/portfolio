import angular from "../images/languages/angular.png";
import blender from "../images/languages/blender.png";
import cpp from "../images/languages/cpp.png";
import figma from "../images/languages/figma.png";
import gsap from "../images/languages/gsap.png";
import jetbrains from "../images/languages/jetbrains.png";
import nest from "../images/languages/nest.png";
import qt from "../images/languages/qt.png";
import springboot from "../images/languages/springboot.png";
import vscode from "../images/languages/vscode.png";
import zed from "../images/languages/zed.png";
import arch from "../images/languages/arch.png";
import cSharp from "../images/languages/csharp.png";
import css from "../images/languages/css.png";
import github from "../images/languages/github.png";
import gtk from "../images/languages/gtk.png";
import jsts from "../images/languages/js-ts.png";
import python from "../images/languages/python.png";
import node from "../images/languages/node.png";
import react from "../images/languages/react.png";
import svelt from "../images/languages/svelt.png";
import vuejs from "../images/languages/vuejs.png";
import astro from "../images/languages/astro.png";
import c from "../images/languages/c.png";
import electron from "../images/languages/electron.png";
import go from "../images/languages/go.png";
import html from "../images/languages/html.png";
import kitty from "../images/languages/kitty.png";
import pcss from "../images/languages/pcss.png";
import rust from "../images/languages/rust.png";
import vite from "../images/languages/vite.png";
import windows from "../images/languages/windows.png";

import type { ISkillImage } from "./interfaces/skill-image.interface";

const SkillImages = {
  angular: { import: angular, highlight: false, alt: "Angular" } as ISkillImage,
  blender: { import: blender, highlight: false, alt: "Blender" } as ISkillImage,
  c: { import: c, highlight: true, alt: "C" } as ISkillImage,
  cpp: { import: cpp, highlight: true, alt: "C++" } as ISkillImage,
  rust: { import: rust, highlight: true, alt: "Rust" } as ISkillImage,
  astro: { import: astro, highlight: true, alt: "Astro" } as ISkillImage,
  arch: { import: arch, highlight: false, alt: "Arch Linux" } as ISkillImage,
  kitty: { import: kitty, highlight: false, alt: "Kitty Terminal" } as ISkillImage,
  nest: { import: nest, highlight: true, alt: "NestJS" } as ISkillImage,
  zed: { import: zed, highlight: false, alt: "Zed Text Editor" } as ISkillImage,
  figma: { import: figma, highlight: true, alt: "Figma" } as ISkillImage,
  gsap: { import: gsap, highlight: false, alt: "GSAP" } as ISkillImage,
  jetbrains: { import: jetbrains, highlight: false, alt: "JetBrains" } as ISkillImage,
  qt: { import: qt, highlight: false, alt: "Qt" } as ISkillImage,
  springboot: { import: springboot, highlight: false, alt: "Spring Boot" } as ISkillImage,
  vscode: { import: vscode, highlight: false, alt: "VS Code" } as ISkillImage,
  cSharp: { import: cSharp, highlight: false, alt: "C#" } as ISkillImage,
  css: { import: css, highlight: true, alt: "CSS" } as ISkillImage,
  github: { import: github, highlight: false, alt: "GitHub" } as ISkillImage,
  gtk: { import: gtk, highlight: false, alt: "GTK" } as ISkillImage,
  jsts: { import: jsts, highlight: true, alt: "JavaScript & TypeScript" } as ISkillImage,
  python: { import: python, highlight: true, alt: "Python" } as ISkillImage,
  node: { import: node, highlight: true, alt: "Node.js" } as ISkillImage,
  react: { import: react, highlight: false, alt: "React" } as ISkillImage,
  svelt: { import: svelt, highlight: false, alt: "Svelte" } as ISkillImage,
  vuejs: { import: vuejs, highlight: true, alt: "Vue.js" } as ISkillImage,
  electron: { import: electron, highlight: false, alt: "Electron" } as ISkillImage,
  go: { import: go, highlight: false, alt: "Go" } as ISkillImage,
  html: { import: html, highlight: true, alt: "HTML" } as ISkillImage,
  pcss: { import: pcss, highlight: true, alt: "PostCSS" } as ISkillImage,
  vite: { import: vite, highlight: true, alt: "Vite" } as ISkillImage,
  windows: { import: windows, highlight: false, alt: "Windows" } as ISkillImage,
};

export default SkillImages;
