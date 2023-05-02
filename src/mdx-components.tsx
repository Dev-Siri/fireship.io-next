import CourseVideoPlayer from "@/components/CourseVideoPlayer";
import Figure from "@/components/Figure";
import VideoPlayer from "@/components/VideoPlayer";
import Android from "@/components/icons/Android";
import Angular from "@/components/icons/Angular";
import AngularTypeScript from "@/components/icons/AngularTypeScript";
import Apple from "@/components/icons/Apple";
import CSS from "@/components/icons/CSS";
import Check from "@/components/icons/Check";
import Cog from "@/components/icons/Cog";
import Dart from "@/components/icons/Dart";
import Discord from "@/components/icons/Discord";
import Docker from "@/components/icons/Docker";
import File from "@/components/icons/File";
import FileIcon from "@/components/icons/FileIcon";
import Firebase from "@/components/icons/Firebase";
import Flutter from "@/components/icons/Flutter";
import Git from "@/components/icons/Git";
import Github from "@/components/icons/Github";
import Go from "@/components/icons/Go";
import Gradle from "@/components/icons/Gradle";
import HTML from "@/components/icons/HTML";
import JSX from "@/components/icons/JSX";
import JavaScript from "@/components/icons/JavaScript";
import LinkedIn from "@/components/icons/LinkedIn";
import Login from "@/components/icons/Login";
import Logo from "@/components/icons/Logo";
import Medium from "@/components/icons/Medium";
import NPM from "@/components/icons/NPM";
import Nest from "@/components/icons/Nest";
import Next from "@/components/icons/Next";
import Node from "@/components/icons/Node";
import Portfolio from "@/components/icons/Portfolio";
import PostgreSQL from "@/components/icons/PostgreSQL";
import Python from "@/components/icons/Python";
import RXJS from "@/components/icons/RXJS";
import React from "@/components/icons/React";
import SCSS from "@/components/icons/SCSS";
import SQL from "@/components/icons/SQL";
import Search from "@/components/icons/Search";
import Slack from "@/components/icons/Slack";
import Solidity from "@/components/icons/Solidity";
import Supabase from "@/components/icons/Supabase";
import Svelte from "@/components/icons/Svelte";
import Terminal from "@/components/icons/Terminal";
import Twitter from "@/components/icons/Twitter";
import TypeScript from "@/components/icons/TypeScript";
import VSCode from "@/components/icons/VSCode";
import Vite from "@/components/icons/Vite";
import Vitest from "@/components/icons/Vitest";
import Vue from "@/components/icons/Vue";
import YAML from "@/components/icons/YAML";
import Youtube from "@/components/icons/Youtube";

const components = {
  Android,
  Angular,
  AngularTypeScript,
  Apple,
  CSS,
  Check,
  Cog,
  Dart,
  Discord,
  Docker,
  File,
  Firebase,
  Flutter,
  Git,
  Github,
  Go,
  Gradle,
  HTML,
  JSX,
  JavaScript,
  LinkedIn,
  Login,
  Logo,
  Medium,
  NPM,
  Nest,
  Next,
  Node,
  Portfolio,
  PostgreSQL,
  Python,
  RXJS,
  React,
  SCSS,
  SQL,
  Search,
  Slack,
  Solidity,
  Supabase,
  Svelte,
  Terminal,
  Twitter,
  TypeScript,
  VSCode,
  Vite,
  Vitest,
  Vue,
  YAML,
  Youtube,
  FileIcon,
  Figure,
  VideoPlayer,
  CourseVideoPlayer,
};

export default components;

// This is here so @next/mdx works correctly.
// Once MDX is fully supported in Next 13, all the components will use this instead.
// and the default {components} export will be removed.
export function useMDXComponents() {
  return components;
}
