"use client";
import React from "react";
import { ContainerScroll } from "../ui/ContainerScroll";
import Image from "next/image";

export function HeroScrollDemo() {
    return (
        <div className="flex flex-col overflow-hidden">
            <ContainerScroll
                titleComponent={
                    <>
                        <h1 style={{ fontFamily: "Clash Display, sans-serif" }} className="text-2xl font-normal text-black ">
                            Delivering Innovative, Scalable, and Secure <br />
                            <span style={{ fontFamily: "Clash Display, sans-serif" }} className="text-4xl md:text-[4rem] font-normal mt-1 leading-none text-[blue]">
                                Software Solutions
                            </span>
                        </h1>
                    </>
                }
            >
                <Image
                    src={`/ScreenScrollImg.png`}
                    alt="hero"
                    height={720}
                    width={1400}
                    className="mx-auto rounded-2xl object-cover h-full object-left-top"
                    draggable={false}
                    priority={false}
                />
            </ContainerScroll>
        </div>
    );
}
