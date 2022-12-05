import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { List, Statistic, Avatar } from "antd";
import { updateColorNames, updatePalettes } from "./actions";

export default function BrickList() {
  const dispatch = useDispatch();
  const url = "https://api.adrian-gao.com/legao/palettes";
  const palettes = useSelector(state => state.palettes);
  const colorNames = useSelector(state => state.colorNames);
  const stats = useSelector(state => state.stats);
  useEffect(() => {
    fetch(url).then(resp =>
      resp.json().then(json => {
        const palettes_json = json["palettes"];
        const palettes = Object.keys(palettes_json).map(key => [
          key,
          palettes_json[key]
        ]);
        dispatch(updateColorNames(json["names"]));
        dispatch(updatePalettes(palettes));
      })
    );
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {palettes ? (
        <List
          grid={{
            gutter: 16,
            column: 2
          }}
          style={{ textAlign: "left", padding: "20px" }}
          itemLayout="horizontal"
          size="small"
          dataSource={stats ? Object.entries(stats): palettes}
          renderItem={item => {
            const colorCode = item[0];
            const bricks = stats ? stats[colorCode] : -1;
            if (bricks === -1 || bricks > 0) {
              return (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        shape="square"
                        size="large"
                        src={"../../assets/brick_" + colorCode + ".png"}
                      />
                    }
                    description={
                      (bricks > 0 || bricks == -1) ? (
                        <Statistic
                          title={colorNames[item[0]]}
                          value={bricks > 0 ? bricks : ''}
                          suffix="bricks"
                          groupSeparator=","
                        />
                      ) : (
                        ""
                      )
                    }
                  />
                </List.Item>
              );
            } else {
              return <div/>
            }
          }}
        />
      ) : (
        <div />
      )}
    </div>
  );
}
