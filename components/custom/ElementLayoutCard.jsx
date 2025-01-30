import React from 'react'

import { Columns, Columns2, Columns3, Columns4, RectangleHorizontal } from "lucide-react";
import { Facebook, Frame, Framer, Image, Link2, PanelTop, Projector, RectangleEllipsis, SquareSplitVertical, Text, TextSelectionIcon, Twitter } from "lucide-react";

const iconComponents = {
    Columns,
    Columns2,
    Columns3,
    Columns4,
    RectangleHorizontal,
    Facebook,
    Frame,
    Framer,
    Image,
    Link2,
    PanelTop,
    Projector,
    RectangleEllipsis,
    SquareSplitVertical,
    Text,
    TextSelectionIcon,
    Twitter
};

function ElementLayoutCard({ layout }) {

    const icon = layout.icon
    const iconName = icon.replace(/^"|"$/g, '');
    const IconComponent = iconComponents[iconName];

    return (
        <div
            className='flex flex-col items-center justify-center
                    border border-dashed rounded-xl p-3
                    group hover:shadow-md hover:border-primary cursor-pointer
                    '>
            {IconComponent ?
                <IconComponent
                    className='p-2 h-9 w-9 bg-gray-100 group-hover:text-primary group-hover:bg-purple-100 rounded-full'
                /> :
                <span>Icon not found </span>
            }

            <h2 className='text-sm  group-hover:text-primary text-center'>{layout.label}</h2>
        </div>
    )
}

export default ElementLayoutCard