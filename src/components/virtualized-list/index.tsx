import React from 'react';
import { FlatList } from 'react-native';

export const VirtualizedScrollView = (props: any) => {
  return (
    <FlatList
      {...props}
      showsVerticalScrollIndicator={false}
      data={[]}
      keyExtractor={(e, i) => 'dom' + i.toString()}
      ListEmptyComponent={null}
      renderItem={null}
      ListHeaderComponent={() => <>{props.children}</>}
    />
  );
};
