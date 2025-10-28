"use client";

import React from "react";
import { SlideTabsExample, EnhancedNavigationMenu } from "./SliderTabs";

export const NavigationExample: React.FC = () => {
    return (
        <div className="space-y-8 p-8">
            <div>
                <h2 className="text-2xl font-bold mb-4 text-white">Original Slide Tabs</h2>
                <SlideTabsExample />
            </div>
            
            <div>
                <h2 className="text-2xl font-bold mb-4 text-white">Enhanced Navigation Menu</h2>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <EnhancedNavigationMenu />
                </div>
            </div>
        </div>
    );
};

export default NavigationExample;
