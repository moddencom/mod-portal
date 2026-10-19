import { posts } from './posts/data.js';
import { initAdRotator } from './ads.js';

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1561708315057197066/NZB16CB9d4muf7HrjD_XSMXt_Dhz9-zpJjIk0QFh80mV6oWq_ovhjBoM-K1KK-oGqf-x';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('report-form');
  const modSelect = document.getElementById('report-mod');
  const fromNotice = document.getElementById('from-article-notice');
  const successBox = document.getElementById('report-success');
  const submitBtn = document.getElementById('report-submit-btn');
  const errorMsg = document.getElementById('report-error-msg');

  // URLパラメータからMod IDやゲーム名を取得
  const urlParams = new URLSearchParams(window.location.search);
  const paramModId = urlParams.get('id') || urlParams.get('mod') || urlParams.get('game');

  // 動的にセレクトボックスのオプションを生成
  if (modSelect) {
    modSelect.innerHTML = '<option value="">-- 対象のMOD / ゲームを選択してください --</option>';
    posts.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = `『${p.game}』- ${p.title.replace(/【.*?】/, '').trim()}`;
      modSelect.appendChild(opt);
    });

    const otherOpt = document.createElement('option');
    otherOpt.value = 'other';
    otherOpt.textContent = 'その他・ポータルサイト全般へのご意見';
    modSelect.appendChild(otherOpt);

    // URLパラメータで一致するものがあれば自動選択
    if (paramModId) {
      const matched = posts.find(p => p.id === paramModId || p.game.toLowerCase().includes(paramModId.toLowerCase()));
      if (matched) {
        modSelect.value = matched.id;
        if (fromNotice) {
          fromNotice.style.display = 'block';
          fromNotice.innerHTML = `💡 記事<strong>「${matched.title}」</strong>から自動セットされました。`;
        }
      }
    }
  }

  // フォーム送信イベント
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (errorMsg) errorMsg.style.display = 'none';

      const selectedModId = modSelect.value;
      if (!selectedModId) {
        alert('対象のMODを選択してください。');
        modSelect.focus();
        return;
      }

      const postObj = posts.find(p => p.id === selectedModId);
      const modName = postObj ? `『${postObj.game}』${postObj.title}` : 'その他・サイト全般';
      const reportType = document.querySelector('input[name="report_type"]:checked')?.value || '誤字・誤訳・未翻訳';
      const nickname = document.getElementById('report-name').value.trim() || '名無しサバイバー';
      const content = document.getElementById('report-content').value.trim();
      const imageUrl = document.getElementById('report-image').value.trim();

      if (!content) {
        alert('報告内容を入力してください。');
        return;
      }

      // 送信中UI
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="btn-spinner" viewBox="0 0 50 50" style="width: 20px; height: 20px; animation: spin 1s linear infinite; display: inline-block; vertical-align: middle; margin-right: 8px;">
          <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5"></circle>
        </svg>
        <span>Discordへ送信中...</span>
      `;

      // Discord Embed メッセージの組み立て
      const payload = {
        username: "MODポータル報告Bot",
        embeds: [
          {
            title: `📢 【${reportType}】新しい報告が届きました`,
            color: reportType.includes('クラッシュ') ? 0xef4444 : (reportType.includes('誤訳') ? 0x3b82f6 : 0x10b981),
            fields: [
              {
                name: "対象タイトル / MOD",
                value: modName,
                inline: false
              },
              {
                name: "報告種別",
                value: reportType,
                inline: true
              },
              {
                name: "報告者",
                value: nickname,
                inline: true
              },
              {
                name: "報告内容・状況",
                value: content.length > 1000 ? content.slice(0, 1000) + '...(省略)' : content,
                inline: false
              }
            ],
            footer: {
              text: `JP MOD PORTAL 報告システム • ${new Date().toLocaleString('ja-JP')}`
            },
            timestamp: new Date().toISOString()
          }
        ]
      };

      // 画像URLが有効そうならEmbed画像に追加
      if (imageUrl && /^https?:\/\/.+/i.test(imageUrl)) {
        payload.embeds[0].image = { url: imageUrl };
        payload.embeds[0].fields.push({
          name: "スクリーンショット / 添付画像",
          value: imageUrl,
          inline: false
        });
      }

      // 送信元リファラ
      if (document.referrer) {
        payload.embeds[0].fields.push({
          name: "送信元URL",
          value: document.referrer,
          inline: false
        });
      }

      try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`Discord APIエラー: ${response.status}`);
        }

        // 成功
        form.style.display = 'none';
        if (successBox) successBox.style.display = 'block';
      } catch (err) {
        console.error('Webhook送信エラー:', err);
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>🚀 報告を送信する (Discordへ通知)</span>';
        if (errorMsg) {
          errorMsg.style.display = 'block';
          errorMsg.textContent = `送信中にエラーが発生しました（${err.message}）。お手数ですが少し時間をおいて再度お試しください。`;
        }
      }
    });
  }

  // 広告自動ローテーション開始
  initAdRotator();
});
