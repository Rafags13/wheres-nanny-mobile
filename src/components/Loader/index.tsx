import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'
import { MotiSkeletonProps } from 'moti/build/skeleton/types'
import { Skeleton } from 'moti/skeleton'

export default function Loader({ children, ...props }: Omit<MotiSkeletonProps, 'Gradient'>) {
    return (
        <Skeleton colorMode="light" colors={['rgb(222, 220, 220)', 'rgb(160, 160, 160)']} {...props}>
            {children}
        </Skeleton>
    )
}