<footer class="footer">
	<div class="clearfix py3em" style="background-color: #252726;">
		<div class="clearfix c-white">
			<div class="col-sm-2">
				<div class="mx-auto" style="max-width: 80%">
					<img class="img-res" src="/imgs/logo2.png" alt="">
				</div>
			</div>
			<div class="col-sm-offset-1 col-sm-3">
				<h4>后台登录</h4>
				@php
					$rows=[
						'速览家登录'=>'',
						'工地实景登录'=>'',
						'全景商家登录'=>'',
					];
				@endphp
				<ul class="clearfix vertical-ul">
					@foreach($rows as $key => $value)
						<li>
							<a class="c-white" href="{{ $value }}">{{ $key }}</a>
						</li>
					@endforeach
				</ul>
			</div>
			<div class="col-sm-3">
				<h4>关注公众号</h4>
				<div style="max-width: 40%">
					<img class="img-res" src="/imgs/qr.png" alt="">
				</div>
			</div>
			<div class="col-sm-3">
				<h4>商务合作</h4>
				<ul class="clearfix vertical-ul">
					<li>资讯热线：<span>400 - 111 - 8008</span></li>
					<li>售后电话：<span>0571 - 5711355</span></li>
				</ul>
			</div>
		</div>
	</div>
		
	<div class="clearfix c-white py15px center" style="background-color: #131316;">
		版权所有© 2017优果科技，网站备案号：浙ICP备16015098号-4 <span class="ml2em">公安备案号：33010802008375</span>
	</div>
</footer>