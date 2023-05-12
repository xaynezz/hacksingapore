"use client"

import React from 'react'
import { Flex } from '@mantine/core';


export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Flex direction="row" justify="between" align="center">
                <div>
                    {children}
                </div>
            </Flex>
        </html>
    );
}

